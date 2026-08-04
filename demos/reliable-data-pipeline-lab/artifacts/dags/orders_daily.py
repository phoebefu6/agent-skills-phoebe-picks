"""Production-style orchestration example for the Reliable Data Pipeline Lab."""

from datetime import datetime, timedelta

from airflow.decorators import dag, task
from airflow.operators.empty import EmptyOperator
from airflow.sensors.filesystem import FileSensor
from airflow.utils.trigger_rule import TriggerRule


DEFAULT_ARGS = {
    "owner": "commerce-data",
    "retries": 3,
    "retry_delay": timedelta(minutes=3),
    "retry_exponential_backoff": True,
    "execution_timeout": timedelta(minutes=20),
}


@dag(
    dag_id="orders_hourly",
    schedule="15 * * * *",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    max_active_runs=1,
    default_args=DEFAULT_ARGS,
    tags=["commerce", "dbt", "hourly"],
)
def orders_hourly():
    wait_for_source = FileSensor(
        task_id="wait_for_source",
        filepath="orders/{{ data_interval_start | ds }}.ready",
        mode="reschedule",
        poke_interval=60,
        timeout=45 * 60,
    )

    @task()
    def extract_increment(data_interval_start=None, data_interval_end=None):
        """Read one bounded interval so retries and backfills stay idempotent."""
        return {
            "from": data_interval_start.isoformat(),
            "to": data_interval_end.isoformat(),
            "rows": 2_401_882,
        }

    @task()
    def run_dbt_build(interval):
        """In production, call dbt build for the bounded interval."""
        return {**interval, "models": 4, "tests": 24}

    @task()
    def reconcile_counts(interval):
        return {"source_rows": interval["rows"], "target_rows": interval["rows"]}

    @task.branch()
    def quality_gate(build, reconciliation):
        complete = reconciliation["source_rows"] == reconciliation["target_rows"]
        return "publish_mart" if complete and build["tests"] == 24 else "quarantine"

    @task()
    def publish_mart(build):
        """Atomic merge by order_id avoids duplicate rows after retries."""
        return {"status": "published", "rows": build["rows"]}

    @task()
    def quarantine():
        return {"status": "quarantined", "owner_alerted": True}

    cleanup = EmptyOperator(
        task_id="cleanup",
        trigger_rule=TriggerRule.ALL_DONE,
    )

    interval = extract_increment()
    build = run_dbt_build(interval)
    audit = reconcile_counts(interval)
    route = quality_gate(build, audit)
    published = publish_mart(build)
    quarantined = quarantine()

    wait_for_source >> interval
    [build, audit] >> route
    route >> [published, quarantined] >> cleanup


orders_hourly()
