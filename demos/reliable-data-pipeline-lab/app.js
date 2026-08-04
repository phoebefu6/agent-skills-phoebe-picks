const codeSamples = {
  source: {
    path: "artifacts/models/staging/_sources.yml",
    value: `version: 2
sources:
  - name: commerce
    loader: managed_cdc
    loaded_at_field: _loaded_at
    freshness:
      warn_after: { count: 45, period: minute }
      error_after: { count: 60, period: minute }
    tables:
      - name: orders
        columns:
          - name: order_id
            tests: [unique, not_null]
          - name: customer_id
            tests: [not_null]`
  },
  staging: {
    path: "artifacts/models/staging/stg_commerce__orders.sql",
    value: `{{ config(materialized='view') }}

with source as (
  select * from {{ source('commerce', 'orders') }}
), renamed as (
  select
    id as order_id,
    customer_id,
    lower(status) as order_status,
    amount_cents / 100.0 as total_amount,
    cast(updated_at as timestamp) as updated_at,
    _loaded_at
  from source
)
select * from renamed`
  },
  mart: {
    path: "artifacts/models/marts/fct_orders.sql",
    value: `{{ config(
  materialized='incremental',
  unique_key='order_id',
  incremental_strategy='merge',
  on_schema_change='append_new_columns'
) }}

select *
from {{ ref('int_order_value') }}
{% if is_incremental() %}
where updated_at >= (
  select dateadd(hour, -2, max(updated_at)) from {{ this }}
)
{% endif %}`
  },
  tests: {
    path: "artifacts/models/marts/_marts.yml",
    value: `version: 2
models:
  - name: fct_orders
    description: Canonical order transaction mart
    tests:
      - dbt_utils.recency:
          datepart: hour
          field: updated_at
          interval: 1
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: total_amount
        tests:
          - dbt_utils.expression_is_true:
              expression: ">= 0"`
  },
  macro: {
    path: "artifacts/macros/cents_to_currency.sql",
    value: `{% macro cents_to_currency(column_name, precision=2) %}
  round({{ column_name }} / 100.0, {{ precision }})
{% endmacro %}

-- Reused by staging models instead of repeating logic
select
  order_id,
  {{ cents_to_currency('amount_cents') }} as total_amount
from {{ ref('stg_commerce__orders') }}`
  }
};

const codeBlock = document.querySelector("#codeBlock");
const codeDownload = document.querySelector("#codeDownload");
const codeTabs = [...document.querySelectorAll("[data-code]")];

function showCode(key) {
  const sample = codeSamples[key];
  codeBlock.textContent = sample.value;
  codeDownload.href = sample.path;
  codeTabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.code === key)));
}

codeTabs.forEach((tab) => tab.addEventListener("click", () => showCode(tab.dataset.code)));
showCode("source");

const dbtOutcomes = {
  healthy: [
    ["Pass", "Source freshness", "18m old"],
    ["Pass", "Staging models", "2.4M rows"],
    ["Pass", "Incremental mart", "82k changed"],
    ["Pass", "Data tests", "24 / 24"]
  ],
  duplicate: [
    ["Pass", "Source freshness", "21m old"],
    ["Pass", "Staging models", "2.4M rows"],
    ["Pass", "Incremental mart", "82k changed"],
    ["Fail", "Unique order_id", "37 duplicates"]
  ],
  late: [
    ["Pass", "Source freshness", "43m old"],
    ["Pass", "Staging models", "2.3M + late window"],
    ["Pass", "Incremental mart", "2h lookback merged"],
    ["Pass", "Data tests", "late rows recovered"]
  ],
  schema: [
    ["Pass", "Source freshness", "16m old"],
    ["Pass", "Staging models", "new column detected"],
    ["Pass", "Incremental mart", "column appended"],
    ["Pass", "Contract check", "non-breaking"]
  ]
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

document.querySelector("#runDbt").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const condition = document.querySelector('input[name="condition"]:checked').value;
  const rows = [...document.querySelectorAll("#dbtLog li")];
  const status = document.querySelector("#dbtStatus");
  button.disabled = true;
  status.className = "status-chip running";
  status.textContent = "Running";
  rows.forEach((row) => { row.className = ""; row.children[0].textContent = "Waiting"; row.children[2].textContent = "queued"; });

  for (let index = 0; index < rows.length; index += 1) {
    const result = dbtOutcomes[condition][index];
    rows[index].children[0].textContent = "Running";
    rows[index].children[2].textContent = "checking";
    await wait(260);
    rows[index].className = result[0] === "Pass" ? "pass" : "fail";
    rows[index].children[0].textContent = result[0];
    rows[index].children[1].textContent = result[1];
    rows[index].children[2].textContent = result[2];
  }

  const failed = dbtOutcomes[condition].some((row) => row[0] === "Fail");
  status.className = `status-chip ${failed ? "failed" : "success"}`;
  status.textContent = failed ? "Blocked" : "Passed";
  button.disabled = false;
});

const dagTasks = [...document.querySelectorAll("#dagMap .task")];
const dagStatus = document.querySelector("#dagStatus");
const alertBox = document.querySelector("#alertBox");
const attempt = document.querySelector("#attempt");
const rowCount = document.querySelector("#rowCount");
const qualityScore = document.querySelector("#qualityScore");
const outcome = document.querySelector("#outcome");
const elapsed = document.querySelector("#elapsed");

function resetDag() {
  dagTasks.forEach((task) => { task.className = "task"; });
  dagStatus.className = "status-chip";
  dagStatus.textContent = "Ready";
  attempt.textContent = "0 / 3";
  rowCount.textContent = "0";
  qualityScore.textContent = "Pending";
  outcome.textContent = "Not started";
  elapsed.textContent = "00:00";
  alertBox.className = "alert-box";
  alertBox.innerHTML = "<strong>No incident</strong><p>Failures will show the alert, retry, cleanup, and recovery decision here.</p>";
}

async function setTask(task, state, delay = 260) {
  task.className = "task running";
  await wait(delay);
  task.className = `task ${state}`;
}

document.querySelector("#runDag").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const condition = document.querySelector("#runCondition").value;
  resetDag();
  button.disabled = true;
  dagStatus.className = "status-chip running";
  dagStatus.textContent = "Running";
  attempt.textContent = "1 / 3";

  await setTask(dagTasks[0], "success");
  rowCount.textContent = "2,401,882";
  await setTask(dagTasks[1], "success");

  if (condition === "retry") {
    dagTasks[2].className = "task running";
    await wait(260);
    dagTasks[2].className = "task failed";
    attempt.textContent = "1 / 3 failed";
    alertBox.className = "alert-box failure";
    alertBox.innerHTML = "<strong>Warehouse connection reset</strong><p>Exponential retry scheduled. The task is idempotent, so the same partition can run safely.</p>";
    await wait(420);
    attempt.textContent = "2 / 3";
    await setTask(dagTasks[2], "success", 330);
  } else {
    await setTask(dagTasks[2], "success");
  }

  await setTask(dagTasks[3], "success", 180);
  await setTask(dagTasks[4], condition === "quality" ? "failed" : "success");

  if (condition === "quality") {
    dagTasks[5].className = "task skipped";
    qualityScore.textContent = "94.2%";
    outcome.textContent = "Quarantined";
    elapsed.textContent = "08:41";
    dagStatus.className = "status-chip failed";
    dagStatus.textContent = "Blocked";
    alertBox.className = "alert-box failure";
    alertBox.innerHTML = "<strong>Publication stopped safely</strong><p>Completeness fell below 98%. Evidence is quarantined, cleanup ran, and the commerce owner was alerted.</p>";
  } else {
    await setTask(dagTasks[5], "success");
    qualityScore.textContent = "99.7%";
    outcome.textContent = condition === "retry" ? "Recovered" : "Published";
    elapsed.textContent = condition === "retry" ? "14:26" : "09:12";
    dagStatus.className = "status-chip success";
    dagStatus.textContent = condition === "retry" ? "Recovered" : "Success";
    alertBox.className = "alert-box";
    alertBox.innerHTML = condition === "retry"
      ? "<strong>Recovered on attempt 2</strong><p>No duplicate rows were created. The original failure and successful retry remain in the run log.</p>"
      : "<strong>Within all operating targets</strong><p>The mart published atomically after freshness, reconciliation, and quality checks passed.</p>";
  }
  button.disabled = false;
});

document.querySelector("#clearDag").addEventListener("click", resetDag);
document.querySelector("#backfill").addEventListener("click", () => {
  const date = document.querySelector("#backfillDate").value;
  document.querySelector("#runTitle").textContent = `Backfill prepared: ${date}`;
  alertBox.className = "alert-box";
  alertBox.innerHTML = `<strong>Safe replay ready</strong><p>${date} will use a bounded data interval and merge by order_id. Existing rows will update, not duplicate.</p>`;
  outcome.textContent = "Awaiting trigger";
});

resetDag();
