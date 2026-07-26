(function () {
  "use strict";

  if (!window.d3 || !Array.isArray(window.WISHLIST_CANDIDATES)) {
    const shell = document.getElementById("chartShell");
    if (shell) shell.textContent = "The visualization runtime or dataset could not be loaded.";
    return;
  }

  const d3 = window.d3;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration = reducedMotion ? 0 : 650;
  const width = 1160;
  const height = 650;
  const margin = { top: 34, right: 42, bottom: 70, left: 168 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const categoryLabels = {
    "design-art": "Design & art",
    "data-analytics": "Data & analytics",
    "llm-agents": "LLMs & agents",
    "data-science-ml": "Data science & ML",
    product: "Product",
    "knowledge-base": "Knowledge base",
    office: "Office",
    "data-dashboard": "Data → dashboard",
    marketing: "Marketing",
    "one-person-company": "One-person company"
  };

  const palette = [
    "#f4db63",
    "#8edbc3",
    "#f28b75",
    "#8fbbff",
    "#d79cff",
    "#ffadce",
    "#91df77",
    "#ffb45f",
    "#7bd7e8",
    "#d6cfbe",
    "#ef748f"
  ];

  const skills = window.WISHLIST_CANDIDATES.map((item) => ({
    ...item,
    type: "skill",
    stars: Number(item.githubStars) || 0,
    categoryLabel: categoryLabels[item.category] || item.category,
    searchText: `${item.id} ${item.focus} ${item.sourceRepo} ${item.buildTarget}`.toLowerCase()
  }));

  const categories = Array.from(new Set(skills.map((item) => item.category)));
  const repositories = Array.from(new Set(skills.map((item) => item.sourceRepo)));
  const color = d3.scaleOrdinal().domain(categories).range(palette);
  const radius = d3.scaleSqrt()
    .domain(d3.extent(skills, (item) => item.stars))
    .range([9, 26]);
  const formatStars = d3.format(".3~s");
  const formatCount = d3.format(",d");

  const state = {
    view: "cluster",
    category: "all",
    query: "",
    selected: null,
    brushedIds: new Set()
  };

  const nodes = {
    search: document.getElementById("skillSearch"),
    category: document.getElementById("categorySelect"),
    reset: document.getElementById("resetView"),
    visibleCount: document.getElementById("visibleCount"),
    selectionStatus: document.getElementById("selectionStatus"),
    selectionPanel: document.getElementById("selectionPanel"),
    tooltip: document.getElementById("chartTooltip"),
    viewKicker: document.getElementById("viewKicker"),
    chartTitle: document.getElementById("chart-title"),
    zoomControls: document.getElementById("zoomControls"),
    ringTotal: document.getElementById("ringTotal"),
    legend: document.getElementById("categoryLegend")
  };

  document.getElementById("heroSkills").textContent = skills.length;
  document.getElementById("heroCategories").textContent = categories.length;
  document.getElementById("heroRepos").textContent = repositories.length;

  d3.select(nodes.category)
    .selectAll("option.category-option")
    .data(categories)
    .join("option")
    .attr("class", "category-option")
    .attr("value", (item) => item)
    .text((item) => categoryLabels[item] || item);

  const svg = d3.select("#skillChart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  const defs = svg.append("defs");
  const glow = defs.append("filter")
    .attr("id", "node-glow")
    .attr("x", "-80%")
    .attr("y", "-80%")
    .attr("width", "260%")
    .attr("height", "260%");
  glow.append("feGaussianBlur").attr("stdDeviation", 5).attr("result", "blur");
  const glowMerge = glow.append("feMerge");
  glowMerge.append("feMergeNode").attr("in", "blur");
  glowMerge.append("feMergeNode").attr("in", "SourceGraphic");

  const clusterLayer = svg.append("g").attr("class", "cluster-layer");
  const clusterViewport = clusterLayer.append("g").attr("class", "cluster-viewport");
  const clusterLabelLayer = clusterViewport.append("g").attr("class", "cluster-labels");
  const clusterLinkLayer = clusterViewport.append("g").attr("class", "cluster-links");
  const clusterNodeLayer = clusterViewport.append("g").attr("class", "cluster-nodes");
  const scatterLayer = svg.append("g").attr("class", "scatter-layer").attr("opacity", 0);
  const scatterGridLayer = scatterLayer.append("g").attr("class", "scatter-grid");
  const scatterAxisLayer = scatterLayer.append("g").attr("class", "scatter-axes");
  const scatterBrushLayer = scatterLayer.append("g").attr("class", "scatter-brush");
  const scatterNodeLayer = scatterLayer.append("g").attr("class", "scatter-nodes");
  const treemapLayer = svg.append("g").attr("class", "treemap-layer").attr("opacity", 0);

  let simulation = null;

  const categoryColumns = 4;
  function categoryCenter(category) {
    const foundIndex = categories.indexOf(category);
    const index = foundIndex >= 0 ? foundIndex : 0;
    const col = index % categoryColumns;
    const row = Math.floor(index / categoryColumns);
    const x = 160 + col * ((width - 320) / Math.max(1, categoryColumns - 1));
    const y = 135 + row * 215;
    return [x, y];
  }

  const zoom = d3.zoom()
    .scaleExtent([0.55, 4.5])
    .filter((event) => state.view === "cluster" && !event.button)
    .on("zoom", (event) => {
      if (state.view === "cluster") {
        clusterViewport.attr("transform", event.transform);
      }
    });

  svg.call(zoom).on("dblclick.zoom", null);

  function visibleSkills() {
    return skills.filter((item) => {
      const categoryMatch = state.category === "all" || item.category === state.category;
      const queryMatch = !state.query || item.searchText.includes(state.query);
      return categoryMatch && queryMatch;
    });
  }

  function sourceId(repo) {
    return `repo:${repo}`;
  }

  function clusterGraph(data) {
    const repoNodes = Array.from(new Set(data.map((item) => item.sourceRepo))).map((repo) => ({
      id: sourceId(repo),
      type: "repo",
      repo,
      label: repo,
      count: data.filter((item) => item.sourceRepo === repo).length
    }));
    const skillNodes = data.map((item) => ({ ...item }));
    const links = skillNodes.map((item) => ({
      id: `${item.id}:${item.sourceRepo}`,
      source: item.id,
      target: sourceId(item.sourceRepo)
    }));
    return { nodes: [...skillNodes, ...repoNodes], links };
  }

  function showTooltip(event, datum) {
    const item = datum.data || datum;
    const isRepo = item.type === "repo";
    const isCategory = Boolean(datum.children && !item.type);
    const heading = isRepo ? item.repo : (item.label || item.id);
    const detail = isRepo
      ? `${item.count} visible Skill${item.count === 1 ? "" : "s"}`
      : isCategory
        ? `${datum.value} Skill${datum.value === 1 ? "" : "s"} in this focus area`
        : `${item.categoryLabel}<br>${formatStars(item.stars)} GitHub stars`;
    nodes.tooltip.innerHTML = `<strong>${escapeHtml(heading)}</strong><br>${detail}`;
    nodes.tooltip.style.left = `${event.clientX + 14}px`;
    nodes.tooltip.style.top = `${event.clientY - 42}px`;
    nodes.tooltip.classList.add("is-visible");
  }

  function moveTooltip(event) {
    nodes.tooltip.style.left = `${event.clientX + 14}px`;
    nodes.tooltip.style.top = `${event.clientY - 42}px`;
  }

  function hideTooltip() {
    nodes.tooltip.classList.remove("is-visible");
  }

  function selectDatum(datum) {
    const item = datum.data || datum;
    if (item.type === "repo") {
      state.selected = item.id;
      const repoSkills = visibleSkills().filter((skill) => skill.sourceRepo === item.repo);
      nodes.selectionPanel.innerHTML = `
        <p class="selection-number">R${String(repositories.indexOf(item.repo) + 1).padStart(2, "0")}</p>
        <h3 id="inspector-title">${escapeHtml(item.repo)}</h3>
        <p>${formatCount(repoSkills.length)} visible Skills connect to this repository.</p>
        <div class="selection-meta">
          <span>Repository hub</span>
          <strong>${escapeHtml(repoSkills.map((skill) => skill.id).join(" · "))}</strong>
        </div>
      `;
      return;
    }

    state.selected = item.id;
    nodes.selectionPanel.innerHTML = `
      <p class="selection-number">${String(item.rank).padStart(2, "0")}</p>
      <h3 id="inspector-title">${escapeHtml(item.id)}</h3>
      <p>${escapeHtml(item.buildTarget)}</p>
      <div class="selection-meta">
        <span>${escapeHtml(item.categoryLabel)}</span>
        <strong>${formatCount(item.stars)} GitHub stars</strong>
        <span>${escapeHtml(item.sourceRepo)}</span>
      </div>
      <a class="selection-link" href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">Inspect source ↗</a>
    `;
    updateSelectedStyles();
  }

  function updateSelectedStyles() {
    clusterNodeLayer.selectAll(".graph-node")
      .classed("is-selected", (item) => item.id === state.selected)
      .select("circle")
      .attr("filter", (item) => item.id === state.selected ? "url(#node-glow)" : null);

    scatterNodeLayer.selectAll(".scatter-node")
      .classed("is-selected", (item) => item.id === state.selected)
      .select("circle")
      .attr("filter", (item) => item.id === state.selected ? "url(#node-glow)" : null);

    treemapLayer.selectAll(".treemap-cell")
      .classed("is-selected", (item) => item.data.id === state.selected);
  }

  function clearSelection() {
    state.selected = null;
    nodes.selectionPanel.innerHTML = `
      <p class="selection-number">00</p>
      <h3 id="inspector-title">Choose a Skill</h3>
      <p>Hover for a quick read. Select any node or treemap cell to hold its source, build target, and popularity snapshot here.</p>
    `;
    updateSelectedStyles();
  }

  function renderCluster(data) {
    const graph = clusterGraph(data);

    const labels = clusterLabelLayer.selectAll(".category-anchor")
      .data(state.category === "all" ? categories : [state.category], (item) => item)
      .join(
        (enter) => {
          const group = enter.append("g").attr("class", "category-anchor").attr("opacity", 0);
          group.append("circle").attr("r", 32);
          group.append("text").attr("text-anchor", "middle").attr("dy", 4);
          return group;
        },
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("transform", (item) => {
        const [x, y] = categoryCenter(item);
        return `translate(${x},${y})`;
      });

    labels.select("circle")
      .attr("fill", (item) => color(item))
      .attr("fill-opacity", 0.05)
      .attr("stroke", (item) => color(item))
      .attr("stroke-opacity", 0.25)
      .attr("stroke-dasharray", "3,5");

    labels.select("text")
      .attr("fill", (item) => color(item))
      .attr("fill-opacity", 0.55)
      .style("font-family", "var(--mono)")
      .style("font-size", "9px")
      .style("font-weight", 800)
      .text((item) => categoryLabels[item] || item);

    labels.transition("anchor-in").duration(transitionDuration).attr("opacity", 1);

    const links = clusterLinkLayer.selectAll(".repo-link")
      .data(graph.links, (item) => item.id)
      .join(
        (enter) => enter.append("line")
          .attr("class", "repo-link")
          .attr("stroke", "#ffffff")
          .attr("stroke-opacity", 0)
          .attr("stroke-width", 1),
        (update) => update,
        (exit) => exit.remove()
      );

    links.transition("link-in").duration(transitionDuration).attr("stroke-opacity", 0.13);

    const graphNodes = clusterNodeLayer.selectAll(".graph-node")
      .data(graph.nodes, (item) => item.id)
      .join(
        (enter) => {
          const group = enter.append("g")
            .attr("class", "graph-node")
            .attr("tabindex", 0)
            .attr("role", "button")
            .style("cursor", "grab")
            .attr("opacity", 0);
          group.append("circle").attr("r", 0);
          group.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", (item) => item.type === "repo" ? 4 : 3)
            .attr("pointer-events", "none");
          return group;
        },
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("aria-label", (item) => item.type === "repo"
        ? `${item.repo} repository hub, ${item.count} visible Skills`
        : `${item.id}, ${item.categoryLabel}, ${formatCount(item.stars)} GitHub stars`)
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip)
      .on("click", (event, item) => {
        event.stopPropagation();
        selectDatum(item);
      })
      .on("keydown", (event, item) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectDatum(item);
        }
      });

    graphNodes.call(dragBehavior());

    graphNodes.select("circle")
      .attr("stroke-width", (item) => item.type === "repo" ? 2 : 1.5)
      .attr("stroke", (item) => item.type === "repo" ? "#f3f0e8" : d3.color(color(item.category)).brighter(0.8))
      .attr("fill", (item) => item.type === "repo" ? "#121827" : color(item.category))
      .attr("fill-opacity", (item) => item.type === "repo" ? 1 : 0.88)
      .transition("node-size")
      .duration(transitionDuration)
      .attr("r", (item) => item.type === "repo" ? 18 + Math.min(item.count, 8) : radius(item.stars));

    graphNodes.select("text")
      .attr("fill", (item) => item.type === "repo" ? "#f4db63" : "#10141b")
      .style("font-family", "var(--mono)")
      .style("font-size", (item) => item.type === "repo" ? "7px" : "7px")
      .style("font-weight", 900)
      .text((item) => item.type === "repo" ? truncate(item.repo.split("/").pop(), 11) : item.rank);

    graphNodes.transition("node-in").duration(transitionDuration).attr("opacity", 1);

    if (simulation) simulation.stop();
    simulation = d3.forceSimulation(graph.nodes)
      .force("link", d3.forceLink(graph.links)
        .id((item) => item.id)
        .distance((link) => link.source.type === "repo" ? 72 : 66)
        .strength(0.25))
      .force("charge", d3.forceManyBody().strength((item) => item.type === "repo" ? -150 : -42))
      .force("collide", d3.forceCollide().radius((item) => item.type === "repo" ? 28 : radius(item.stars) + 4).iterations(2))
      .force("x", d3.forceX((item) => {
        if (item.type === "repo") return width / 2;
        return categoryCenter(item.category)[0];
      }).strength((item) => item.type === "repo" ? 0.015 : 0.11))
      .force("y", d3.forceY((item) => {
        if (item.type === "repo") return height / 2;
        return categoryCenter(item.category)[1];
      }).strength((item) => item.type === "repo" ? 0.015 : 0.11))
      .alphaDecay(0.028)
      .velocityDecay(0.42)
      .on("tick", () => {
        links
          .attr("x1", (item) => item.source.x)
          .attr("y1", (item) => item.source.y)
          .attr("x2", (item) => item.target.x)
          .attr("y2", (item) => item.target.y);
        graphNodes.attr("transform", (item) => `translate(${item.x},${item.y})`);
      });

    updateSelectedStyles();
  }

  function dragBehavior() {
    return d3.drag()
      .on("start", (event, item) => {
        if (state.view !== "cluster" || !simulation) return;
        if (!event.active) simulation.alphaTarget(0.25).restart();
        item.fx = item.x;
        item.fy = item.y;
      })
      .on("drag", (event, item) => {
        if (state.view !== "cluster") return;
        item.fx = event.x;
        item.fy = event.y;
      })
      .on("end", (event, item) => {
        if (state.view !== "cluster" || !simulation) return;
        if (!event.active) simulation.alphaTarget(0);
        item.fx = null;
        item.fy = null;
      });
  }

  function renderScatter(data) {
    if (simulation) simulation.stop();
    const x = d3.scaleLog()
      .domain([d3.min(skills, (item) => item.stars) * 0.9, d3.max(skills, (item) => item.stars) * 1.08])
      .range([0, plotWidth])
      .nice();
    const visibleCategories = state.category === "all" ? categories : [state.category];
    const y = d3.scaleBand()
      .domain(visibleCategories)
      .range([0, plotHeight])
      .padding(0.32);
    const collisionOffsets = [
      [0, 0],
      [-16, -10],
      [16, -10],
      [-16, 10],
      [16, 10],
      [-32, 0],
      [32, 0],
      [0, -20],
      [0, 20]
    ];
    const scatterOffsets = new Map();
    d3.groups(data, (item) => `${item.category}|${item.stars}`).forEach(([, group]) => {
      group.slice().sort((a, b) => d3.ascending(a.id, b.id)).forEach((item, index) => {
        scatterOffsets.set(item.id, collisionOffsets[index] || [0, (index - 4) * 9]);
      });
    });
    const scatterPoint = (item) => {
      const [dx, dy] = scatterOffsets.get(item.id) || [0, 0];
      return [
        margin.left + x(item.stars) + dx,
        margin.top + y(item.category) + y.bandwidth() / 2 + dy
      ];
    };

    scatterGridLayer
      .attr("transform", `translate(${margin.left},${margin.top + plotHeight})`)
      .transition("grid")
      .duration(transitionDuration)
      .call(d3.axisBottom(x).ticks(7, "~s").tickSize(-plotHeight).tickFormat(""))
      .call((axis) => {
        axis.select(".domain").remove();
        axis.selectAll(".tick line")
          .attr("stroke", "rgba(255,255,255,0.11)")
          .attr("stroke-dasharray", "3,5");
      });

    const xAxis = scatterAxisLayer.selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(${margin.left},${margin.top + plotHeight})`)
      .call(d3.axisBottom(x).ticks(7, "~s"));

    xAxis.selectAll("text").attr("fill", "rgba(255,255,255,0.62)").style("font-family", "var(--mono)");
    xAxis.selectAll("line, .domain").attr("stroke", "rgba(255,255,255,0.25)");

    const yAxis = scatterAxisLayer.selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y).tickFormat((item) => categoryLabels[item] || item).tickSize(0).tickPadding(14));

    yAxis.select(".domain").remove();
    yAxis.selectAll("text")
      .attr("fill", (item) => color(item))
      .style("font-family", "var(--mono)")
      .style("font-size", "10px")
      .style("font-weight", 800);

    scatterAxisLayer.selectAll(".x-label")
      .data([null])
      .join("text")
      .attr("class", "x-label")
      .attr("x", margin.left + plotWidth / 2)
      .attr("y", height - 16)
      .attr("text-anchor", "middle")
      .attr("fill", "rgba(255,255,255,0.54)")
      .style("font-family", "var(--mono)")
      .style("font-size", "10px")
      .text("GitHub stars · logarithmic scale");

    const dots = scatterNodeLayer.selectAll(".scatter-node")
      .data(data, (item) => item.id)
      .join(
        (enter) => {
          const group = enter.append("g")
            .attr("class", "scatter-node")
            .attr("tabindex", 0)
            .attr("role", "button")
            .attr("opacity", 0);
          group.append("circle").attr("r", 0);
          group.append("text").attr("text-anchor", "middle").attr("dy", 3);
          return group;
        },
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("aria-label", (item) => `${item.id}, ${formatCount(item.stars)} GitHub stars`)
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip)
      .on("click", (event, item) => {
        event.stopPropagation();
        selectDatum(item);
      })
      .on("keydown", (event, item) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectDatum(item);
        }
      });

    dots.transition("scatter-position")
      .duration(transitionDuration)
      .ease(d3.easeCubicInOut)
      .attr("opacity", 1)
      .attr("transform", (item) => {
        const [px, py] = scatterPoint(item);
        return `translate(${px},${py})`;
      });

    dots.select("circle")
      .attr("fill", (item) => color(item.category))
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#10141b")
      .attr("stroke-width", 1.5)
      .transition("scatter-radius")
      .duration(transitionDuration)
      .attr("r", (item) => Math.min(9, Math.max(6.5, radius(item.stars) * 0.5)));

    dots.select("text")
      .attr("fill", "#10141b")
      .style("font-family", "var(--mono)")
      .style("font-size", "7px")
      .style("font-weight", 900)
      .text((item) => item.rank);

    const brush = d3.brush()
      .extent([[margin.left, margin.top], [margin.left + plotWidth, margin.top + plotHeight]])
      .on("start brush end", ({ selection }) => {
        state.brushedIds.clear();
        if (!selection) {
          dots.attr("opacity", 1);
          nodes.selectionStatus.textContent = "Drag across the plot to shortlist a region";
          return;
        }
        const [[x0, y0], [x1, y1]] = selection;
        dots.each(function (item) {
          const [px, py] = scatterPoint(item);
          if (px >= x0 && px <= x1 && py >= y0 && py <= y1) state.brushedIds.add(item.id);
        });
        dots.attr("opacity", (item) => state.brushedIds.has(item.id) ? 1 : 0.16);
        nodes.selectionStatus.textContent = `${state.brushedIds.size} Skill${state.brushedIds.size === 1 ? "" : "s"} inside brush`;
      });

    scatterBrushLayer.call(brush);
    scatterBrushLayer.selectAll(".selection")
      .attr("fill", "rgba(244,219,99,0.14)")
      .attr("stroke", "#f4db63");
    scatterBrushLayer.selectAll(".overlay").attr("cursor", "crosshair");
    updateSelectedStyles();
  }

  function renderTreemap(data) {
    if (simulation) simulation.stop();
    const nested = {
      id: "skills",
      children: Array.from(d3.group(data, (item) => item.category), ([category, values]) => ({
        id: category,
        label: categoryLabels[category] || category,
        category,
        children: values
      }))
    };

    const root = d3.hierarchy(nested)
      .sum((item) => item.type === "skill" ? 1 : 0)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    d3.treemap()
      .tile(d3.treemapSquarify)
      .size([width - 48, height - 48])
      .paddingOuter(5)
      .paddingTop((node) => node.depth === 1 ? 28 : 0)
      .paddingInner(3)
      .round(true)(root);

    const cells = treemapLayer.selectAll(".treemap-cell")
      .data(root.descendants().filter((item) => item.depth > 0), (item) => item.data.id)
      .join(
        (enter) => {
          const group = enter.append("g").attr("class", "treemap-cell").attr("opacity", 0);
          group.append("rect");
          group.append("text").attr("class", "cell-title");
          group.append("text").attr("class", "cell-meta");
          return group;
        },
        (update) => update,
        (exit) => exit.remove()
      )
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", (item) => item.depth === 2
        ? `${item.data.id}, ${formatCount(item.data.stars)} GitHub stars`
        : `${item.data.label}, ${item.value} Skills`)
      .on("mouseover", (event, item) => showTooltip(event, item))
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip)
      .on("click", (event, item) => {
        event.stopPropagation();
        if (item.depth === 1) {
          state.category = state.category === item.data.category ? "all" : item.data.category;
          nodes.category.value = state.category;
          render();
        } else {
          selectDatum(item);
        }
      })
      .on("keydown", (event, item) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (item.depth === 1) {
            state.category = state.category === item.data.category ? "all" : item.data.category;
            nodes.category.value = state.category;
            render();
          } else {
            selectDatum(item);
          }
        }
      });

    cells.transition("treemap-position")
      .duration(transitionDuration)
      .ease(d3.easeCubicInOut)
      .attr("opacity", 1)
      .attr("transform", (item) => `translate(${item.x0 + 24},${item.y0 + 24})`);

    cells.select("rect")
      .transition("treemap-size")
      .duration(transitionDuration)
      .attr("width", (item) => Math.max(0, item.x1 - item.x0))
      .attr("height", (item) => Math.max(0, item.y1 - item.y0))
      .attr("rx", (item) => item.depth === 1 ? 0 : 3)
      .attr("fill", (item) => color(item.data.category || item.parent.data.category))
      .attr("fill-opacity", (item) => item.depth === 1 ? 0.08 : 0.78)
      .attr("stroke", (item) => color(item.data.category || item.parent.data.category))
      .attr("stroke-opacity", (item) => item.depth === 1 ? 0.75 : 0.22);

    cells.select(".cell-title")
      .attr("x", 8)
      .attr("y", (item) => item.depth === 1 ? 18 : 17)
      .attr("fill", (item) => item.depth === 1 ? color(item.data.category) : "#10141b")
      .style("font-family", "var(--mono)")
      .style("font-size", (item) => item.depth === 1 ? "10px" : "9px")
      .style("font-weight", 900)
      .text((item) => {
        const cellWidth = item.x1 - item.x0;
        if (item.depth === 1) return cellWidth > 90 ? `${item.data.label} · ${item.value}` : "";
        return cellWidth > 62 ? truncate(item.data.id, Math.floor(cellWidth / 7.2)) : "";
      });

    cells.select(".cell-meta")
      .attr("x", 8)
      .attr("y", 32)
      .attr("fill", "rgba(16,20,27,0.72)")
      .style("font-family", "var(--mono)")
      .style("font-size", "8px")
      .text((item) => {
        const cellWidth = item.x1 - item.x0;
        const cellHeight = item.y1 - item.y0;
        return item.depth === 2 && cellWidth > 70 && cellHeight > 46 ? `${formatStars(item.data.stars)} stars` : "";
      });

    updateSelectedStyles();
  }

  function renderRing(data) {
    const ringWidth = 150;
    const ringRadius = 62;
    const grouped = Array.from(d3.rollup(data, (values) => values.length, (item) => item.category), ([category, value]) => ({
      category,
      value
    }));
    const pie = d3.pie().sort(null).value((item) => item.value);
    const arc = d3.arc().innerRadius(39).outerRadius(ringRadius).cornerRadius(2).padAngle(0.025);
    const ringSvg = d3.select("#categoryRing")
      .attr("viewBox", `0 0 ${ringWidth} ${ringWidth}`);
    const group = ringSvg.selectAll(".ring-group")
      .data([null])
      .join("g")
      .attr("class", "ring-group")
      .attr("transform", `translate(${ringWidth / 2},${ringWidth / 2})`);

    group.selectAll("path")
      .data(pie(grouped), (item) => item.data.category)
      .join(
        (enter) => enter.append("path")
          .attr("fill", (item) => color(item.data.category))
          .attr("stroke", "#151c2a")
          .attr("stroke-width", 2)
          .each(function (item) { this._current = { startAngle: item.startAngle, endAngle: item.startAngle }; }),
        (update) => update,
        (exit) => exit.transition().duration(transitionDuration / 2).attrTween("d", function (item) {
          const interpolate = d3.interpolate(this._current, { ...item, endAngle: item.startAngle });
          return (t) => arc(interpolate(t));
        }).remove()
      )
      .attr("tabindex", 0)
      .attr("role", "button")
      .attr("aria-label", (item) => `${categoryLabels[item.data.category] || item.data.category}, ${item.data.value} visible Skills`)
      .style("cursor", "pointer")
      .on("click", (event, item) => {
        state.category = state.category === item.data.category ? "all" : item.data.category;
        nodes.category.value = state.category;
        render();
      })
      .on("keydown", (event, item) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          state.category = state.category === item.data.category ? "all" : item.data.category;
          nodes.category.value = state.category;
          render();
        }
      })
      .transition("ring-update")
      .duration(transitionDuration)
      .attrTween("d", function (item) {
        const interpolate = d3.interpolate(this._current || item, item);
        this._current = item;
        return (t) => arc(interpolate(t));
      });

    group.selectAll(".ring-center")
      .data([data.length])
      .join("text")
      .attr("class", "ring-center")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "#f3f0e8")
      .style("font-family", "var(--display)")
      .style("font-size", "24px")
      .style("font-weight", 900)
      .text((item) => item);

    nodes.ringTotal.textContent = data.length;
  }

  function renderLegend(data) {
    const counts = d3.rollup(data, (values) => values.length, (item) => item.category);
    d3.select(nodes.legend)
      .selectAll(".legend-button")
      .data(categories, (item) => item)
      .join("button")
      .attr("type", "button")
      .attr("class", (item) => `legend-button${state.category === item ? " is-active" : ""}`)
      .style("--legend-color", (item) => color(item))
      .attr("aria-pressed", (item) => state.category === item)
      .text((item) => `${categoryLabels[item] || item} · ${counts.get(item) || 0}`)
      .on("click", (event, item) => {
        state.category = state.category === item ? "all" : item;
        nodes.category.value = state.category;
        render();
      });
  }

  function updateViewCopy() {
    const copy = {
      cluster: {
        kicker: "Force + source links",
        title: "Repository gravity",
        status: "Drag nodes · scroll to zoom · select for details"
      },
      scatter: {
        kicker: "Axes + brush",
        title: "Popularity star map",
        status: "Drag across the plot to shortlist a region"
      },
      treemap: {
        kicker: "Hierarchy + area",
        title: "Portfolio coverage",
        status: "Select a cell for details · select a group to isolate it"
      }
    }[state.view];
    nodes.viewKicker.textContent = copy.kicker;
    nodes.chartTitle.textContent = copy.title;
    nodes.selectionStatus.textContent = copy.status;
    nodes.zoomControls.hidden = state.view !== "cluster";
  }

  function render() {
    const data = visibleSkills();
    const selectedIsVisible = !state.selected
      || data.some((item) => item.id === state.selected)
      || (state.selected.startsWith("repo:") && data.some((item) => sourceId(item.sourceRepo) === state.selected));
    if (!selectedIsVisible) clearSelection();
    nodes.visibleCount.textContent = `${data.length} Skill${data.length === 1 ? "" : "s"} visible`;
    document.querySelectorAll("[data-view]").forEach((button) => {
      const active = button.dataset.view === state.view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    updateViewCopy();
    renderRing(data);
    renderLegend(skills);

    const layerState = {
      cluster: clusterLayer,
      scatter: scatterLayer,
      treemap: treemapLayer
    };
    Object.entries(layerState).forEach(([name, layer]) => {
      const active = name === state.view;
      layer
        .attr("display", active ? null : "none")
        .attr("aria-hidden", active ? null : "true")
        .style("pointer-events", active ? "all" : "none")
        .attr("opacity", active ? 1 : 0);
    });

    if (state.view === "cluster") renderCluster(data);
    if (state.view === "scatter") renderScatter(data);
    if (state.view === "treemap") renderTreemap(data);
  }

  function reset() {
    state.category = "all";
    state.query = "";
    state.selected = null;
    state.brushedIds.clear();
    nodes.search.value = "";
    nodes.category.value = "all";
    clearSelection();
    svg.transition().duration(transitionDuration).call(zoom.transform, d3.zoomIdentity);
    render();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function truncate(value, length) {
    const text = String(value);
    return text.length > length ? `${text.slice(0, Math.max(1, length - 1))}…` : text;
  }

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      state.brushedIds.clear();
      svg.transition().duration(transitionDuration).call(zoom.transform, d3.zoomIdentity);
      render();
    });
  });

  nodes.search.addEventListener("input", () => {
    state.query = nodes.search.value.trim().toLowerCase();
    render();
  });

  nodes.category.addEventListener("change", () => {
    state.category = nodes.category.value;
    render();
  });

  nodes.reset.addEventListener("click", reset);

  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.zoom;
      if (action === "reset") {
        svg.transition().duration(transitionDuration).call(zoom.transform, d3.zoomIdentity);
      } else {
        const factor = action === "in" ? 1.35 : 0.74;
        svg.transition().duration(transitionDuration).call(zoom.scaleBy, factor);
      }
    });
  });

  svg.on("click.selection", () => {
    clearSelection();
  });

  try {
    render();
  } catch (error) {
    window.__skillConstellationErrors = window.__skillConstellationErrors || [];
    window.__skillConstellationErrors.push(error && error.stack ? error.stack : String(error));
    document.documentElement.dataset.runtimeError = error && error.stack ? error.stack : String(error);
    throw error;
  }
}());
