(() => {
  "use strict";

  const INK = "#1C1C1A";
  const PAPER = "#F0EFEB";
  const MUTED = "#8F8E88";
  const FAINT = "#C6C5BF";
  const GRID = "#DEDDD6";
  const LADDER = [INK, "#4A4944", "#6A6963", MUTED, "#B0AFA9"];
  const NS = "http://www.w3.org/2000/svg";
  const timers = {};

  const rnd = (i, k) => Math.abs(((i * 73856093) ^ (k * 19349663)) % 1000) / 1000;
  const polar = (cx, cy, radius, degrees) => {
    const angle = degrees * Math.PI / 180;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  };
  const add = (parent, tag, attrs) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    parent.appendChild(node);
    return node;
  };
  const label = (parent, attrs, value) => {
    const node = add(parent, "text", attrs);
    node.textContent = value;
    return node;
  };
  const tooltip = (node, value) => {
    const title = document.createElementNS(NS, "title");
    title.textContent = value;
    node.appendChild(title);
  };
  const keep = (id, timer) => {
    timers[id] = timers[id] || [];
    timers[id].push(timer);
  };
  const clearTimers = (id) => {
    (timers[id] || []).forEach((timer) => clearTimeout(timer));
    timers[id] = [];
  };

  const allPicks = Array.isArray(window.PICKS) ? window.PICKS : [];
  const snapshotEnd = "2026-08-20";
  const published = allPicks.filter((pick) => (
    pick.status === "published"
    && Number.isFinite(pick.rating)
    && pick.dateExplored <= snapshotEnd
  ));

  document.getElementById("published-count").textContent = published.length;
  const mean = published.reduce((sum, pick) => sum + pick.rating, 0) / Math.max(1, published.length);
  document.getElementById("mean-rating").textContent = mean.toFixed(1);

  const renderers = {};
  const register = (id, renderer) => {
    renderers[id] = renderer;
    const svg = document.getElementById(id);
    const draw = () => {
      clearTimers(id);
      svg.innerHTML = "";
      renderer(svg);
    };
    svg.addEventListener("click", draw);
    if (!("IntersectionObserver" in window)) {
      draw();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        draw();
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(svg);
  };

  const ratingBands = [
    ["7.5–7.9", published.filter((pick) => pick.rating >= 7.5 && pick.rating < 8).length],
    ["8.0–8.4", published.filter((pick) => pick.rating >= 8 && pick.rating < 8.5).length],
    ["8.5–8.9", published.filter((pick) => pick.rating >= 8.5 && pick.rating < 9).length],
    ["9.0+", published.filter((pick) => pick.rating >= 9).length]
  ];

  register("rating-bands", (svg) => {
    const xAt = (index) => 74 + index * 84;
    const base = 264;
    const step = 13.2;
    const halfWidth = 22;

    ratingBands.forEach(([name, value], index) => {
      const x = xAt(index);
      for (let rung = 0; rung < value; rung += 1) {
        const y = base - rung * step;
        const width = halfWidth - 2 + rnd(rung + 1, index + 2) * 4;
        const line = add(svg, "line", {
          x1: x - width,
          y1: y,
          x2: x + width,
          y2: y,
          stroke: index === 2 ? INK : LADDER[index + 1],
          "stroke-width": 1,
          opacity: 0.56 + rnd(rung + 2, index + 4) * 0.44,
          class: "fade",
          style: `animation-delay:${index * 0.08 + rung * 0.024}s`
        });
        tooltip(line, `${name}: rung ${rung + 1} of ${value} published Skills`);
        if (rung % 5 === 4) {
          add(svg, "circle", {
            cx: x + halfWidth + 6,
            cy: y,
            r: 1,
            fill: FAINT,
            class: "fade",
            style: `animation-delay:${index * 0.08 + rung * 0.024}s`
          });
        }
      }
      const top = base - Math.max(0, value - 1) * step;
      label(svg, {
        x,
        y: top - 14,
        "font-size": 13,
        "font-weight": 800,
        fill: INK,
        "text-anchor": "middle",
        class: "fade",
        style: `animation-delay:${0.35 + index * 0.08}s`
      }, value);
      label(svg, {
        x,
        y: base + 22,
        "font-size": 8,
        "font-weight": 700,
        fill: MUTED,
        "text-anchor": "middle",
        "letter-spacing": ".07em",
        class: "fade"
      }, name);
    });

    add(svg, "line", { x1: 34, y1: base + 5, x2: 366, y2: base + 5, stroke: GRID, "stroke-width": 0.8, class: "fade" });
    label(svg, {
      x: 200,
      y: 309,
      "font-size": 7,
      "font-weight": 600,
      fill: "#B0AFA9",
      "text-anchor": "middle",
      "letter-spacing": ".12em",
      class: "fade",
      style: "animation-delay:.9s"
    }, "ONE RUNG = ONE PUBLISHED SKILL · DOT MARKS EVERY FIFTH");
  });

  const themeDefinitions = [
    ["DESIGN + UI", ["design", "product-design"]],
    ["CONTENT + MKTG", ["content-writing", "marketing"]],
    ["DATA + REPORT", ["data", "reporting"]],
    ["PRODUCT + RESEARCH", ["product-management", "research"]],
    ["WORKFLOW + AUTO", ["agent-workflow", "automation"]]
  ];
  const groupedCounts = themeDefinitions.map(([name, scenarios], index) => [
    name,
    published.filter((pick) => scenarios.includes(pick.scenarios[0])).length,
    index
  ]);
  const rawShares = groupedCounts.map(([, count]) => count / published.length * 100);
  const roundedShares = rawShares.map(Math.floor);
  let pointsLeft = 100 - roundedShares.reduce((sum, value) => sum + value, 0);
  [...rawShares.keys()]
    .sort((a, b) => (rawShares[b] % 1) - (rawShares[a] % 1))
    .forEach((index) => {
      if (pointsLeft > 0) {
        roundedShares[index] += 1;
        pointsLeft -= 1;
      }
    });
  const themeGroups = groupedCounts.map(([name, count, index]) => [name, count, roundedShares[index], LADDER[index]]);
  const positions = [[104, 116], [268, 102], [102, 240], [242, 235], [337, 205]];

  register("portfolio-mix", (svg) => {
    [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]].forEach(([from, to], index) => {
      add(svg, "line", {
        x1: positions[from][0], y1: positions[from][1],
        x2: positions[to][0], y2: positions[to][1],
        stroke: GRID,
        "stroke-width": 0.7,
        "stroke-dasharray": "2 5",
        class: "fade",
        style: `animation-delay:${0.85 + index * 0.08}s`
      });
    });

    themeGroups.forEach(([name, count, share, shade], cluster) => {
      const [cx, cy] = positions[cluster];
      let edge = 0;
      for (let dotIndex = 0; dotIndex < share; dotIndex += 1) {
        const angle = dotIndex * 137.508 + cluster * 55;
        const radius = 4 + Math.sqrt(dotIndex) * 5.25 + rnd(dotIndex + 1, cluster + 2) * 2.6;
        edge = Math.max(edge, radius);
        const [x, y] = polar(cx, cy, radius, angle);
        if (dotIndex % 5 === 0) {
          add(svg, "line", {
            x1: cx, y1: cy, x2: x, y2: y,
            stroke: "#CDCCC5",
            "stroke-width": 0.6,
            class: "fade",
            style: `animation-delay:${cluster * 0.14 + dotIndex * 0.012}s`
          });
        }
        const dot = add(svg, "circle", {
          cx: x,
          cy: y,
          r: 1.45 + rnd(dotIndex + 2, cluster + 3) * 1.55,
          fill: shade,
          opacity: 0.9,
          class: "pop",
          style: `animation-delay:${cluster * 0.14 + dotIndex * 0.012}s`
        });
        tooltip(dot, `${name}: ${count} of 24 Skills, ${share}% after whole-point rounding`);
      }
      add(svg, "circle", { cx, cy, r: 2.4, fill: INK, class: "pop", style: `animation-delay:${cluster * 0.14}s` });
      label(svg, {
        x: cx,
        y: cy + edge + 13,
        "font-size": cluster === 3 ? 6.6 : 7.2,
        "font-weight": 800,
        fill: INK,
        "text-anchor": "middle",
        "letter-spacing": ".07em",
        style: `paint-order:stroke;stroke:${PAPER};stroke-width:3px;animation-delay:${0.5 + cluster * 0.12}s`,
        class: "fade"
      }, `${name} · ${count}`);
    });

    label(svg, {
      x: 200,
      y: 314,
      "font-size": 7,
      "font-weight": 600,
      fill: "#B0AFA9",
      "text-anchor": "middle",
      "letter-spacing": ".1em",
      class: "fade",
      style: "animation-delay:1.3s"
    }, "ONE DOT = ONE ROUNDED PERCENTAGE POINT · COUNTS: 10 + 6 + 3 + 3 + 2 = 24");
  });

  const toDateKey = (date) => date.toISOString().slice(0, 10);
  const start = new Date("2026-07-16T00:00:00Z");
  const end = new Date(`${snapshotEnd}T00:00:00Z`);
  const dateCounts = published.reduce((result, pick) => {
    result[pick.dateExplored] = (result[pick.dateExplored] || 0) + 1;
    return result;
  }, {});
  const daily = [];
  let cumulative = 0;
  for (let date = new Date(start); date <= end; date.setUTCDate(date.getUTCDate() + 1)) {
    const key = toDateKey(date);
    cumulative += dateCounts[key] || 0;
    daily.push({ key, value: cumulative, added: dateCounts[key] || 0 });
  }

  register("growth-line", (svg) => {
    const left = 46;
    const right = 800;
    const base = 262;
    const top = 36;
    const max = Math.max(...daily.map((day) => day.value));
    const xAt = (index) => left + index / (daily.length - 1) * (right - left);
    const yAt = (value) => base - value / max * (base - top);

    [0, 6, 12, 18, 24].forEach((value) => {
      const y = yAt(value);
      add(svg, "line", { x1: left, y1: y, x2: right, y2: y, stroke: GRID, "stroke-width": 0.55, class: "fade" });
      label(svg, { x: left - 12, y: y + 3, "font-size": 7, "font-weight": 600, fill: FAINT, "text-anchor": "end", class: "fade" }, value);
    });

    daily.forEach((day, index) => {
      const x = xAt(index);
      const y = yAt(day.value);
      add(svg, "line", {
        x1: x,
        y1: base,
        x2: x,
        y2: y,
        stroke: day.added ? INK : MUTED,
        "stroke-width": day.added ? 1.1 : 0.55,
        opacity: day.added ? 1 : 0.42 + rnd(index + 1, 7) * 0.38,
        class: "fade",
        style: `animation-delay:${index * 0.014}s`
      });
    });

    const path = daily.map((day, index) => `${xAt(index)} ${yAt(day.value)}`).join(" L ");
    add(svg, "path", {
      d: `M${path}`,
      fill: "none",
      stroke: INK,
      "stroke-width": 1.2,
      pathLength: 1,
      class: "draw",
      style: "animation-delay:.35s;animation-duration:1.25s"
    });

    daily.forEach((day, index) => {
      if (!day.added) return;
      const x = xAt(index);
      const y = yAt(day.value);
      const dot = add(svg, "circle", {
        cx: x, cy: y, r: day.added >= 3 ? 4.2 : 2.8,
        fill: INK,
        class: "pop",
        style: `animation-delay:${0.25 + index * 0.025}s`
      });
      tooltip(dot, `${day.key}: +${day.added}, ${day.value} cumulative published picks`);
      if (day.added >= 3 || index === 0 || index === daily.length - 1) {
        label(svg, {
          x,
          y: y - 11,
          "font-size": 9.5,
          "font-weight": 800,
          fill: INK,
          "text-anchor": "middle",
          style: `paint-order:stroke;stroke:${PAPER};stroke-width:3px;animation-delay:${0.8 + index * 0.01}s`,
          class: "fade"
        }, day.value);
      }
    });

    [[0, "16 JUL"], [16, "01 AUG"], [28, "13 AUG"], [35, "20 AUG"]].forEach(([index, text]) => {
      const x = xAt(index);
      label(svg, {
        x,
        y: base + 20,
        "font-size": 7.5,
        "font-weight": 600,
        fill: MUTED,
        "text-anchor": index === 0 ? "start" : index === 35 ? "end" : "middle",
        "letter-spacing": ".1em",
        class: "fade"
      }, text);
    });

    label(svg, {
      x: 420,
      y: 308,
      "font-size": 7,
      "font-weight": 600,
      fill: "#B0AFA9",
      "text-anchor": "middle",
      "letter-spacing": ".12em",
      class: "fade",
      style: "animation-delay:1.3s"
    }, "ONE HAIRLINE = ONE CALENDAR DAY · DARK = A REVIEW BATCH LANDED");
  });

  document.getElementById("replay-all").addEventListener("click", () => {
    Object.entries(renderers).forEach(([id, renderer], index) => {
      keep(id, setTimeout(() => {
        const svg = document.getElementById(id);
        clearTimers(id);
        svg.innerHTML = "";
        renderer(svg);
      }, index * 120));
    });
  });
})();
