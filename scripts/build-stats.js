#!/usr/bin/env node
// Regenerate stats.json from data/reviews.js.
//
// The README badges and the live gallery both read these counts, so publishing
// a pick updates every surface without anyone editing a number by hand.

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
global.window = {};
require(path.join(root, "data", "reviews.js"));

const picks = global.window.PICKS || [];
const byStatus = picks.reduce((acc, p) => {
  acc[p.status] = (acc[p.status] || 0) + 1;
  return acc;
}, {});

const rated = picks.filter((p) => typeof p.rating === "number");
const avg = rated.length
  ? Number((rated.reduce((s, p) => s + p.rating, 0) / rated.length).toFixed(1))
  : null;

const stats = {
  updated: new Date().toISOString().slice(0, 10),
  picks_published: byStatus.published || 0,
  picks_exploring: byStatus.exploring || 0,
  field_tests: picks.length,
  wishlist_candidates: (global.window.WISHLIST_CANDIDATES || []).length,
  average_rating: avg,
};

const out = path.join(root, "stats.json");
fs.writeFileSync(out, JSON.stringify(stats, null, 2) + "\n");
console.log(
  `stats.json: ${stats.picks_published} published, ${stats.field_tests} field tests, ` +
    `${stats.wishlist_candidates} on the wishlist`
);
