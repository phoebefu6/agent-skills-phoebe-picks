const signals = [
  {
    theme: "trust",
    themeLabel: "Trust & provenance",
    confidence: "High",
    source: "Reddit · AgentSkills",
    quote: "There's no quality signal for skill files at all.",
    context: "A practitioner argues that curation only helps when the Skill itself can be trusted.",
    url: "https://www.reddit.com/r/AgentSkills/comments/1sfpkm9/does_anyone_else_find_it_weird_that_ai_agents/"
  },
  {
    theme: "outcomes",
    themeLabel: "Outcome proof",
    confidence: "Medium",
    source: "Reddit · AI Agents",
    quote: "We keep adding skills ... and have no idea which ones actually work.",
    context: "The discussion recommends measuring downstream use and task outcomes instead of asking the agent to self-assess.",
    url: "https://www.reddit.com/r/AI_Agents/comments/1uasix6/we_keep_adding_skills_to_our_agents_and_have_no/"
  },
  {
    theme: "maintenance",
    themeLabel: "Portability & drift",
    confidence: "High",
    source: "Reddit · AI Agents",
    quote: "The biggest pain point I've hit is skill drift.",
    context: "A multi-agent user describes silent behavior changes and recommends versioning plus output validation.",
    url: "https://www.reddit.com/r/AI_Agents/comments/1tw0aw5/how_do_you_manage_skills_across_agents/"
  },
  {
    theme: "trust",
    themeLabel: "Trust & provenance",
    confidence: "High",
    source: "GitHub · vercel-labs/skills #617",
    quote: "Users need to distinguish between official, verified, and community skills.",
    context: "A signature-verification RFC frames authenticity, tampering, and trust hierarchy as ecosystem requirements.",
    url: "https://github.com/vercel-labs/skills/issues/617"
  },
  {
    theme: "maintenance",
    themeLabel: "Portability & drift",
    confidence: "High",
    source: "GitHub · vercel-labs/skills #283",
    quote: "There's currently no command that says install everything from this lock file.",
    context: "A user wants reproducible restoration and synchronization across machines from a declarative manifest.",
    url: "https://github.com/vercel-labs/skills/issues/283"
  },
  {
    theme: "economy",
    themeLabel: "Instruction economy",
    confidence: "Low",
    source: "GitHub · anthropics/skills #202",
    quote: "The verbose, educational tone significantly undermines token efficiency.",
    context: "One detailed Skill critique argues for lean operational instructions and progressive disclosure.",
    url: "https://github.com/anthropics/skills/issues/202"
  },
  {
    theme: "trust",
    themeLabel: "Trust & provenance",
    confidence: "High",
    source: "GitHub · vercel-labs/skills #353",
    quote: "The selected skill can be malicious while still being installed under the expected directory name.",
    context: "A namespace-squatting disclosure shows why familiar names are not sufficient provenance evidence.",
    url: "https://github.com/vercel-labs/skills/issues/353"
  },
  {
    theme: "discovery",
    themeLabel: "Discovery friction",
    confidence: "Medium",
    source: "GitHub · vercel-labs/skills #452",
    quote: "The skill should be found and installed. It used to work.",
    context: "A discovery regression hid an authored Skill when third-party Skills existed in a standard directory.",
    url: "https://github.com/vercel-labs/skills/issues/452"
  }
];

const themes = [
  { id: "all", label: "All signals" },
  { id: "trust", label: "Trust & provenance" },
  { id: "outcomes", label: "Outcome proof" },
  { id: "discovery", label: "Discovery friction" },
  { id: "maintenance", label: "Portability & drift" },
  { id: "economy", label: "Instruction economy" }
];

const buttons = [...document.querySelectorAll("[data-mode]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const filterRoot = document.querySelector("#themeFilters");
const quoteRoot = document.querySelector("#quoteBank");
const summaryRoot = document.querySelector("#signalSummary");
let activeTheme = "all";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setMode(mode) {
  buttons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  panels.forEach((panel) => {
    const active = panel.dataset.panel === mode;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

function renderSignals() {
  const visible = signals.filter((signal) => activeTheme === "all" || signal.theme === activeTheme);
  const active = themes.find((theme) => theme.id === activeTheme) || themes[0];

  filterRoot.innerHTML = themes.map((theme) => `
    <button class="theme-filter${theme.id === activeTheme ? " is-active" : ""}" type="button" data-theme="${theme.id}">
      ${escapeHtml(theme.label)} (${theme.id === "all" ? signals.length : signals.filter((item) => item.theme === theme.id).length})
    </button>
  `).join("");

  summaryRoot.innerHTML = `
    <h3>${activeTheme === "all" ? "Eight public signals reveal five recurring adoption tensions." : escapeHtml(active.label)}</h3>
    <span>${visible.length} ${visible.length === 1 ? "source" : "sources"}</span>
  `;

  quoteRoot.innerHTML = visible.map((signal) => `
    <article class="quote-card">
      <div class="quote-meta"><span>${escapeHtml(signal.themeLabel)}</span><span>${escapeHtml(signal.confidence)} confidence</span></div>
      <blockquote>“${escapeHtml(signal.quote)}”</blockquote>
      <p>${escapeHtml(signal.context)}</p>
      <a href="${escapeHtml(signal.url)}" target="_blank" rel="noreferrer">Open source ↗</a>
    </article>
  `).join("");
}

buttons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
filterRoot.addEventListener("click", (event) => {
  const button = event.target.closest("[data-theme]");
  if (!button) return;
  activeTheme = button.dataset.theme;
  renderSignals();
});

renderSignals();
