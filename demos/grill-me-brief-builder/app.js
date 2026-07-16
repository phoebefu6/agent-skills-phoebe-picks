(function () {
  const questions = [
    {
      key: "artifact",
      label: "Artifact",
      question: "What should this idea produce first?",
      recommended: "A small static demo page that produces a clear build brief from a vague idea.",
      why: "This prevents the work from turning into a broad platform before there is proof that the idea helps anyone.",
      riskyWords: ["platform", "everything", "all users", "marketplace", "database"]
    },
    {
      key: "audience",
      label: "Audience",
      question: "Who is the first audience, and what painful moment are we solving for them?",
      recommended: "AI-curious builders who have a vague idea but need a sharper brief before asking an agent to build.",
      why: "A brief only becomes useful when it is anchored to one user and one moment of friction.",
      riskyWords: ["everyone", "anyone", "general", "all people"]
    },
    {
      key: "success",
      label: "Success proof",
      question: "What proof would make this worth shipping?",
      recommended: "A user can answer five questions and receive a brief with outcome, audience, scope, risks, and next steps.",
      why: "This creates an observable success condition instead of relying on whether the page feels nice.",
      riskyWords: ["viral", "perfect", "complete", "monetize"]
    },
    {
      key: "scope",
      label: "Scope boundary",
      question: "What should stay out of the first version?",
      recommended: "No accounts, saved projects, AI API calls, database, analytics, or collaboration features.",
      why: "The grill-me method pushes back on scope that hides risk or delays the first useful artifact.",
      riskyWords: ["login", "accounts", "payment", "api", "database", "collaboration"]
    },
    {
      key: "handoff",
      label: "Handoff",
      question: "What is the next clear execution step after the brief exists?",
      recommended: "Use the brief to build one static prototype, then rate the Skill with 3 strengths and 3 improvements.",
      why: "Grilling should stop once the next step is clear; more questions would only polish wording.",
      riskyWords: ["more research", "decide later", "not sure", "maybe"]
    }
  ];

  const state = {
    step: 0,
    started: false,
    decisions: {}
  };

  const nodes = {
    idea: document.getElementById("ideaInput"),
    facts: document.getElementById("knownFacts"),
    start: document.getElementById("startButton"),
    reset: document.getElementById("resetButton"),
    stepCounter: document.getElementById("stepCounter"),
    riskLabel: document.getElementById("riskLabel"),
    question: document.getElementById("questionText"),
    recommended: document.getElementById("recommendedText"),
    why: document.getElementById("whyText"),
    answer: document.getElementById("answerInput"),
    useRecommendation: document.getElementById("useRecommendationButton"),
    back: document.getElementById("backButton"),
    next: document.getElementById("nextButton"),
    pushbackBox: document.getElementById("pushbackBox"),
    pushbackText: document.getElementById("pushbackText"),
    decisionList: document.getElementById("decisionList"),
    briefPanel: document.getElementById("briefPanel"),
    briefOutput: document.getElementById("briefOutput"),
    copy: document.getElementById("copyButton")
  };

  function currentQuestion() {
    return questions[state.step];
  }

  function escapeText(value) {
    return String(value || "").trim();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function summarizeDecision(question, answer) {
    return `${question.label}: ${answer}`;
  }

  function detectRisk(question, answer) {
    const value = answer.toLowerCase();
    const hit = question.riskyWords.find((word) => value.includes(word));
    if (!hit) return "";
    return `This answer mentions "${hit}". Keep it only if it is essential to the first proof; otherwise defer it to protect the release.`;
  }

  function renderQuestion() {
    const item = currentQuestion();
    nodes.stepCounter.textContent = `Step ${state.step + 1} of ${questions.length}`;
    nodes.riskLabel.textContent = item.label;
    nodes.question.textContent = item.question;
    nodes.recommended.textContent = item.recommended;
    nodes.why.textContent = item.why;
    nodes.answer.value = state.decisions[item.key] || "";
    nodes.back.disabled = state.step === 0;
    nodes.next.textContent = state.step === questions.length - 1 ? "Generate brief" : "Save decision";
    renderPushback();
    renderDecisionList();
  }

  function renderPushback() {
    const item = currentQuestion();
    const answer = escapeText(nodes.answer.value);
    const message = answer ? detectRisk(item, answer) : "";
    nodes.pushbackBox.hidden = !message;
    nodes.pushbackText.textContent = message;
  }

  function renderDecisionList() {
    const savedQuestions = questions.filter((question) => state.decisions[question.key]);
    if (!savedQuestions.length) {
      nodes.decisionList.innerHTML = '<li class="empty-decision">Answer the first question to start the path.</li>';
      return;
    }
    nodes.decisionList.innerHTML = savedQuestions
      .filter((question) => state.decisions[question.key])
      .map((question) => `<li>${escapeHtml(summarizeDecision(question, state.decisions[question.key]))}</li>`)
      .join("");
  }

  function generateBrief() {
    const decisions = questions.reduce((memo, question) => {
      memo[question.key] = state.decisions[question.key] || question.recommended;
      return memo;
    }, {});

    const facts = escapeText(nodes.facts.value) || "No facts supplied.";
    const idea = escapeText(nodes.idea.value) || "No idea supplied.";

    return [
      "# Build Brief",
      "",
      "## Starting Idea",
      idea,
      "",
      "## Facts From Context",
      facts,
      "",
      "## Decisions",
      `- Artifact: ${decisions.artifact}`,
      `- Audience: ${decisions.audience}`,
      `- Success proof: ${decisions.success}`,
      `- Scope boundary: ${decisions.scope}`,
      `- Handoff: ${decisions.handoff}`,
      "",
      "## Assumptions",
      "- The first version should prove usefulness before adding persistence, accounts, or automation.",
      "- A static artifact is enough to test whether the brief format helps.",
      "",
      "## Next Step",
      "Build the smallest static prototype that satisfies the success proof, then run one review pass before publishing."
    ].join("\n");
  }

  function saveCurrentAnswer() {
    const item = currentQuestion();
    const answer = escapeText(nodes.answer.value) || item.recommended;
    state.decisions[item.key] = answer;
  }

  function showBrief() {
    nodes.briefOutput.textContent = generateBrief();
    nodes.briefPanel.hidden = false;
    nodes.briefPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  nodes.start.addEventListener("click", () => {
    state.started = true;
    state.step = 0;
    nodes.briefPanel.hidden = true;
    renderQuestion();
    document.querySelector(".question-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  nodes.reset.addEventListener("click", () => {
    state.step = 0;
    state.started = false;
    state.decisions = {};
    nodes.answer.value = "";
    nodes.briefPanel.hidden = true;
    renderQuestion();
  });

  nodes.useRecommendation.addEventListener("click", () => {
    nodes.answer.value = currentQuestion().recommended;
    renderPushback();
    nodes.answer.focus();
  });

  nodes.answer.addEventListener("input", renderPushback);

  nodes.back.addEventListener("click", () => {
    saveCurrentAnswer();
    state.step = Math.max(0, state.step - 1);
    renderQuestion();
  });

  nodes.next.addEventListener("click", () => {
    saveCurrentAnswer();
    if (state.step === questions.length - 1) {
      renderDecisionList();
      showBrief();
      return;
    }
    state.step += 1;
    renderQuestion();
  });

  nodes.copy.addEventListener("click", async () => {
    const text = nodes.briefOutput.textContent;
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    nodes.copy.textContent = "Copied";
    window.setTimeout(() => {
      nodes.copy.textContent = "Copy brief";
    }, 1200);
  });

  renderQuestion();
})();
