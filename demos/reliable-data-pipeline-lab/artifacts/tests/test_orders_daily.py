"""Structural checks for the example orders Airflow DAG."""

from airflow.models import DagBag


def test_dag_imports_without_errors():
    dagbag = DagBag(dag_folder="artifacts/dags", include_examples=False)
    assert dagbag.import_errors == {}


def test_orders_hourly_structure():
    dagbag = DagBag(dag_folder="artifacts/dags", include_examples=False)
    dag = dagbag.get_dag("orders_hourly")

    assert dag is not None
    assert dag.max_active_runs == 1
    assert dag.catchup is False
    assert {
        "wait_for_source",
        "extract_increment",
        "run_dbt_build",
        "reconcile_counts",
        "quality_gate",
        "publish_mart",
        "quarantine",
        "cleanup",
    } <= {task.task_id for task in dag.tasks}


def test_pipeline_is_acyclic():
    dagbag = DagBag(dag_folder="artifacts/dags", include_examples=False)
    dag = dagbag.get_dag("orders_hourly")
    assert dag.test_cycle() is None
