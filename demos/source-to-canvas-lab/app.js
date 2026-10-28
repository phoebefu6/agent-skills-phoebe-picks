const views = document.querySelectorAll("[data-view]");
const viewButtons = document.querySelectorAll("[data-view-button]");

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.viewButton;
    viewButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    views.forEach((view) => { view.hidden = view.dataset.view !== selected; });
  });
});

const colorClass = (color) => `color-${String(color || "6").replace(/[^1-6]/g, "6")}`;
const getAnchor = (node, side) => {
  const x = node.x * 0.72 + 40;
  const y = node.y * 0.72 + 40;
  const width = node.width * 0.72;
  const height = node.height * 0.72;
  if (side === "top") return [x + width / 2, y];
  if (side === "bottom") return [x + width / 2, y + height];
  if (side === "left") return [x, y + height / 2];
  return [x + width, y + height / 2];
};

function validateCanvas(canvas) {
  const ids = [...canvas.nodes, ...canvas.edges].map((item) => item.id);
  const nodeIds = new Set(canvas.nodes.map((node) => node.id));
  const required = canvas.nodes.every((node) => {
    const generic = ["id", "type", "x", "y", "width", "height"].every((key) => node[key] !== undefined);
    const typed = node.type === "text" ? "text" in node : node.type === "file" ? "file" in node : node.type === "link" ? "url" in node : node.type === "group";
    return generic && typed;
  });
  return [
    Boolean(canvas && Array.isArray(canvas.nodes) && Array.isArray(canvas.edges)),
    ids.length === new Set(ids).size,
    canvas.edges.every((edge) => nodeIds.has(edge.fromNode) && nodeIds.has(edge.toNode)),
    required
  ];
}

function renderCanvas(canvas) {
  const stage = document.querySelector("[data-canvas-stage]");
  const nodeMap = new Map(canvas.nodes.map((node) => [node.id, node]));
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("canvas-edges");
  svg.setAttribute("viewBox", "0 0 1240 650");
  const defs = document.createElementNS(svg.namespaceURI, "defs");
  defs.innerHTML = '<marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="rgba(255,255,255,.66)"></path></marker>';
  svg.append(defs);

  canvas.nodes.filter((node) => node.type === "group").forEach((node) => {
    const group = document.createElement("div");
    group.className = "canvas-group";
    group.dataset.label = node.label || "Group";
    Object.assign(group.style, { left: `${node.x * .72 + 40}px`, top: `${node.y * .72 + 40}px`, width: `${node.width * .72}px`, height: `${node.height * .72}px` });
    stage.append(group);
  });

  canvas.nodes.filter((node) => node.type !== "group").forEach((node) => {
    const element = document.createElement("article");
    element.className = `canvas-node ${colorClass(node.color)}`;
    Object.assign(element.style, { left: `${node.x * .72 + 40}px`, top: `${node.y * .72 + 40}px`, width: `${node.width * .72}px`, height: `${node.height * .72}px` });
    const label = document.createElement("span");
    label.className = "node-type";
    label.textContent = node.type;
    element.append(label);
    if (node.type === "text") {
      const lines = node.text.replace(/^# /, "").split("\n");
      const title = document.createElement("h4");
      title.textContent = lines.shift();
      const body = document.createElement("p");
      body.textContent = lines.join("\n").replaceAll("**", "").trim();
      element.append(title, body);
    } else if (node.type === "link") {
      const title = document.createElement("h4"); title.textContent = "Canonical source";
      const link = document.createElement("a"); link.href = node.url; link.textContent = node.url; link.target = "_blank"; link.rel = "noreferrer";
      element.append(title, link);
    } else {
      const title = document.createElement("h4"); title.textContent = "Clean Markdown";
      const link = document.createElement("a"); link.href = node.file; link.textContent = node.file + (node.subpath || "");
      element.append(title, link);
    }
    stage.append(element);
  });

  canvas.edges.forEach((edge) => {
    const source = nodeMap.get(edge.fromNode);
    const target = nodeMap.get(edge.toNode);
    const [x1, y1] = getAnchor(source, edge.fromSide || "right");
    const [x2, y2] = getAnchor(target, edge.toSide || "left");
    const bend = Math.max(35, Math.abs(x2 - x1) * .35);
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`);
    path.setAttribute("marker-end", "url(#arrow)");
    svg.append(path);
    const label = document.createElementNS(svg.namespaceURI, "text");
    label.setAttribute("x", String((x1 + x2) / 2));
    label.setAttribute("y", String((y1 + y2) / 2 - 7));
    label.setAttribute("text-anchor", "middle");
    label.textContent = edge.label || "";
    svg.append(label);
  });
  stage.prepend(svg);
}

fetch("json-canvas-spec.canvas")
  .then((response) => {
    if (!response.ok) throw new Error("Canvas file could not be loaded.");
    return response.json();
  })
  .then((canvas) => {
    const checks = validateCanvas(canvas);
    renderCanvas(canvas);
    document.querySelector("[data-canvas-status]").textContent = `${canvas.nodes.length} nodes · ${canvas.edges.length} edges`;
    document.querySelector("[data-integrity]").textContent = checks.every(Boolean) ? "4/4 checks passed" : "Needs review";
    document.querySelectorAll("[data-checks] li").forEach((item, index) => {
      item.querySelector("em").textContent = checks[index] ? "Passed" : "Failed";
    });
  })
  .catch((error) => {
    document.querySelector("[data-canvas-status]").textContent = error.message;
    document.querySelector("[data-integrity]").textContent = "Could not validate";
  });
