const periods = [
  {
    label: "Baseline",
    biRate: 0.96,
    rows: [
      { cohort: "Core", feed: "Ledger", scheduled: 80, ready: 76, audited: 80 },
      { cohort: "Extended", feed: "Reference", scheduled: 10, ready: 10, audited: 10 },
      { cohort: "Extended", feed: "Settlement", scheduled: 10, ready: 10, audited: 10 },
    ],
  },
  {
    label: "Current",
    biRate: 0.88,
    rows: [
      { cohort: "Core", feed: "Ledger", scheduled: 60, ready: 54, audited: 60 },
      { cohort: "Extended", feed: "Reference", scheduled: 20, ready: 20, audited: 20 },
      { cohort: "Extended", feed: "Settlement", scheduled: 20, ready: 14, audited: 20 },
    ],
  },
];

function summarize(rows) {
  const scheduled = rows.reduce((total, row) => total + row.scheduled, 0);
  const ready = rows.reduce((total, row) => total + row.ready, 0);
  const audited = rows.reduce((total, row) => total + row.audited, 0);
  return { scheduled, ready, audited, rate: ready / scheduled };
}

const [baseline, current] = periods.map(({ rows }) => summarize(rows));
const cohorts = [...new Set(periods.flatMap(({ rows }) => rows.map(({ cohort }) => cohort)))];
const contributions = cohorts.map((cohort) => {
  const [before, after] = periods.map(({ rows }) =>
    summarize(rows.filter((row) => row.cohort === cohort))
  );
  const beforeWeight = before.scheduled / baseline.scheduled;
  const afterWeight = after.scheduled / current.scheduled;
  return {
    cohort,
    before,
    after,
    mix: (afterWeight - beforeWeight) * before.rate,
    within: afterWeight * (after.rate - before.rate),
  };
});

const change = current.rate - baseline.rate;
const mix = contributions.reduce((total, row) => total + row.mix, 0);
const within = contributions.reduce((total, row) => total + row.within, 0);
const residual = change - mix - within;
const percent = (rate) => `${(rate * 100).toFixed(0)}%`;
const points = (rate) => {
  const rounded = Number((rate * 100).toFixed(1));
  return `${rounded > 0 ? "+" : ""}${rounded.toFixed(1)} pp`;
};
const write = (id, value) => { document.getElementById(id).textContent = value; };

function appendRow(id, values) {
  const row = document.getElementById(id).insertRow();
  values.forEach((value) => { row.insertCell().textContent = value; });
}

write("baseline", percent(baseline.rate));
write("current", percent(current.rate));
write("movement", points(change));

const reconciled = baseline.rate === periods[0].biRate && current.rate === periods[1].biRate;
const coverage = [baseline, current].map(({ audited, scheduled }) => percent(audited / scheduled));
write("reconciliation",
  `The audit rollups ${reconciled ? "match" : "differ from"} the mock BI snapshot. Audit coverage is ${coverage[0]} in the baseline and ${coverage[1]} in the current period.`
);
write("bridge", `Mix added ${points(mix)}. Lower readiness within cohorts contributed ${points(within)}. Reconciliation residual: ${points(residual)}.`);

for (const { label, rows } of periods) {
  for (const { cohort, feed, scheduled, ready, audited } of rows) {
    appendRow("audit-rows", [label, cohort, feed, scheduled, ready, audited]);
  }
}
for (const { cohort, before, after, mix, within } of contributions) {
  appendRow("contribution-rows", [cohort, percent(before.rate), percent(after.rate), points(mix), points(within)]);
}

const [beforeSettlement, afterSettlement] = periods.map(({ rows }) =>
  summarize(rows.filter(({ feed }) => feed === "Settlement"))
);
const settlementMisses = afterSettlement.scheduled - afterSettlement.ready;
write("feed-finding",
  `Settlement readiness fell from ${beforeSettlement.ready}/${beforeSettlement.scheduled} to ${afterSettlement.ready}/${afterSettlement.scheduled}. That feed accounts for ${settlementMisses} of ${current.scheduled - current.ready} current misses and all Extended cohort misses. Core also had six misses, up from four, so the recovery plan needs both cohorts.`
);
