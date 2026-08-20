const stages = {
  source: {
    kicker: "01 · Preserve the input",
    title: "Start with a source you can inspect.",
    copy: "The Skill and its publishing objective were saved before any visual decisions. That keeps facts, labels, and intent anchored to a recoverable input.",
    output: "Output · source.md",
    gate: "Gate · source captured",
    color: "var(--cyan)"
  },
  analysis: {
    kicker: "02 · Define the job",
    title: "Name the audience and the learning goal.",
    copy: "The analysis extracts the message, sequence, exact labels, and likely visual relationships. The illustration is designed around comprehension rather than decoration.",
    output: "Output · analysis.md",
    gate: "Gate · facts checked",
    color: "var(--yellow)"
  },
  structure: {
    kicker: "03 · Build the hierarchy",
    title: "Write the visual before drawing it.",
    copy: "A compact title, seven stages, short explanations, and a closing rule became structured content. This is the information architecture the image prompt must preserve.",
    output: "Output · structured-content.md",
    gate: "Gate · hierarchy readable",
    color: "var(--mint)"
  },
  compose: {
    kicker: "04 · Choose two axes",
    title: "Layout and style are independent choices.",
    copy: "A left-to-right roadmap solved the sequence. A hand-drawn editorial style made the method approachable. Either choice can change without silently rewriting the other.",
    output: "Choice · roadmap × hand-drawn",
    gate: "Gate · landscape confirmed",
    color: "var(--coral)"
  },
  prompt: {
    kicker: "05 · Save the instruction",
    title: "The full prompt is part of the artifact.",
    copy: "Composition, palette, labels, hierarchy, constraints, and aspect ratio were persisted before generation. The result can now be audited, revised, or rerun without guesswork.",
    output: "Output · prompt.md",
    gate: "Gate · prompt persisted",
    color: "var(--violet)"
  },
  verify: {
    kicker: "06 · Inspect the raster",
    title: "Generated does not mean publishable.",
    copy: "The final pass checks the canvas, reading order, hierarchy, labels, contrast, and small text. The image ships only when the visual works at both full size and page scale.",
    output: "Output · infographic.png",
    gate: "Gate · visual QA passed",
    color: "var(--cyan)"
  }
};

const tabs = [...document.querySelectorAll("[data-stage]")];
const panel = document.querySelector("#stage-panel");
const fields = {
  kicker: document.querySelector("#panel-kicker"),
  title: document.querySelector("#panel-title"),
  copy: document.querySelector("#panel-copy"),
  output: document.querySelector("#panel-output"),
  gate: document.querySelector("#panel-gate")
};

function selectStage(key, focusPanel = false) {
  const stage = stages[key];
  if (!stage) return;
  tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.stage === key)));
  Object.entries(fields).forEach(([field, node]) => { node.textContent = stage[field]; });
  panel.style.background = stage.color;
  if (focusPanel) panel.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectStage(tab.dataset.stage));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    next.focus();
    selectStage(next.dataset.stage);
  });
});
