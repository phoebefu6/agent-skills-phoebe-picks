(function () {
  const features = {
    brief: {
      step: "01",
      name: "Clarify the user need",
      summary: "Translate the request into domain, task, input, output, and constraints before searching.",
      points: [
        "Prevents keyword-only recommendations.",
        "Makes the final install decision easier to explain.",
        "Works well when the user is new to Skills."
      ]
    },
    local: {
      step: "02",
      name: "Check local Skills first",
      summary: "Look at already installed Skills before adding more tools to the agent environment.",
      points: [
        "Avoids duplicate Skills.",
        "Keeps the workflow lightweight.",
        "Protects the repo from unnecessary new dependencies."
      ]
    },
    leaderboard: {
      step: "03",
      name: "Check trusted public sources",
      summary: "Prefer known Skill sources, leaderboards, and high-signal repositories before random search results.",
      points: [
        "Supports Phoebe's credibility gate.",
        "Creates an evidence trail followers can inspect.",
        "Reduces the chance of recommending a weak Skill."
      ]
    },
    search: {
      step: "04",
      name: "Search the ecosystem",
      summary: "Use specific domain terms and alternate wording to find candidate Skills.",
      points: [
        "Search terms are derived from the brief.",
        "Results still need source checks.",
        "The install command comes after vetting, not before."
      ]
    },
    quality: {
      step: "05",
      name: "Verify quality",
      summary: "Check source reputation, GitHub stars, install signals, and whether the Skill matches the task.",
      points: [
        "Low-star sources are held back from public picks.",
        "Official or highly trusted sources get priority.",
        "Safety and maintenance are part of usefulness."
      ]
    },
    decision: {
      step: "06",
      name: "Present a decision",
      summary: "Explain what to install, why it fits, and what to do when no strong Skill exists.",
      points: [
        "Recommend only when evidence is good.",
        "Hold or reject when the gate fails.",
        "Offer direct help when no Skill is worth adding."
      ]
    }
  };

  const scenarios = {
    design: {
      domain: "Design",
      query: "frontend design Skill",
      task: "Find a Skill that turns rough agent-built screens into polished UI.",
      gate: "Prefer 10k+ star source or verified top-ranked proof.",
      decision: "Recommend only after a ground-up artifact proves the method."
    },
    data: {
      domain: "Data",
      query: "data visualization reporting Skill",
      task: "Find a Skill that can turn messy data into charts, findings, and an executive report.",
      gate: "Check source, examples, data handling limits, and whether output is reproducible.",
      decision: "Test with a small dataset before it becomes a public pick."
    },
    automation: {
      domain: "Automation",
      query: "workflow automation Skill",
      task: "Find a Skill that removes repeated instructions or boring manual handoffs.",
      gate: "Reject unclear automation that needs risky access or vague permissions.",
      decision: "Publish only if the demo saves repeated work without hidden risk."
    },
    research: {
      domain: "Research",
      query: "research documentation Skill",
      task: "Find a Skill that frames questions, gathers sources, and turns notes into a usable brief.",
      gate: "Require source links, clear method, and visible assumptions.",
      decision: "Use it when the research output is easier to audit than a normal chat."
    }
  };

  const byId = (id) => document.getElementById(id);

  function setFeature(id) {
    const feature = features[id];
    if (!feature) return;
    byId("featureStep").textContent = feature.step;
    byId("featureName").textContent = feature.name;
    byId("featureSummary").textContent = feature.summary;
    byId("featurePoints").innerHTML = feature.points.map((point) => `<li>${point}</li>`).join("");
    document.querySelectorAll("[data-feature]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.feature === id);
    });
  }

  function setScenario(id) {
    const scenario = scenarios[id];
    if (!scenario) return;
    byId("briefDomain").textContent = scenario.domain;
    byId("briefQuery").textContent = scenario.query;
    byId("briefTask").textContent = scenario.task;
    byId("briefGate").textContent = scenario.gate;
    byId("briefDecision").textContent = scenario.decision;
    document.querySelectorAll("[data-scenario]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.scenario === id);
    });
  }

  document.addEventListener("click", (event) => {
    const featureButton = event.target.closest("[data-feature]");
    if (featureButton) {
      setFeature(featureButton.dataset.feature);
      return;
    }

    const scenarioButton = event.target.closest("[data-scenario]");
    if (scenarioButton) {
      setScenario(scenarioButton.dataset.scenario);
    }
  });

  setFeature("brief");
  setScenario("design");
})();
