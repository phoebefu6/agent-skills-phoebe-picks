(function () {
  const preview = document.querySelector("[data-preview]");
  const directionName = document.querySelector("[data-direction-name]");
  const names = { signal: "Signal Map", ledger: "Evidence Ledger", poster: "Proof Poster" };
  const copy = {
    signal: ["Find the skill", "for the job.", "Nine field-tested methods. Each one has source, critique, and a product you can open."],
    ledger: ["The evidence", "is the interface.", "A restrained index of methods, sources, scores, and working artifacts."],
    poster: ["Skills that", "survived a build.", "Bold proof for builders who want the useful answer before the methodology." ]
  };

  function setPressed(buttons, selected) {
    buttons.forEach((button) => {
      const active = button === selected;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  const directionButtons = Array.from(document.querySelectorAll("[data-direction]"));
  directionButtons.forEach((button) => button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    preview.dataset.direction = direction;
    directionName.textContent = names[direction];
    document.querySelector("[data-mock-title]").innerHTML = `${copy[direction][0]}<br>${copy[direction][1]}`;
    document.querySelector("[data-mock-copy]").textContent = copy[direction][2];
    setPressed(directionButtons, button);
  }));

  const deviceButtons = Array.from(document.querySelectorAll("[data-device]"));
  deviceButtons.forEach((button) => button.addEventListener("click", () => {
    preview.dataset.device = button.dataset.device;
    setPressed(deviceButtons, button);
  }));

  const motionToggle = document.querySelector("[data-motion-toggle]");
  motionToggle.addEventListener("change", () => document.body.classList.toggle("motion-off", !motionToggle.checked));

  const runButton = document.querySelector("[data-run-audit]");
  const checks = Array.from(document.querySelectorAll("[data-check]"));
  const score = document.querySelector("[data-score]");
  const note = document.querySelector("[data-score-note]");
  let auditRunning = false;

  runButton.addEventListener("click", () => {
    if (auditRunning) return;
    auditRunning = true;
    checks.forEach((check) => { check.classList.remove("is-passed"); check.querySelector("em").textContent = "Scanning"; });
    score.textContent = "0/4";
    note.textContent = "Scanning visual + mechanical evidence";
    checks.forEach((check, index) => window.setTimeout(() => {
      check.classList.add("is-passed");
      check.querySelector("em").textContent = "Passed";
      score.textContent = `${index + 1}/4`;
      if (index === checks.length - 1) {
        note.textContent = "Direction is ready to ship";
        runButton.textContent = "Run again ↻";
        auditRunning = false;
      }
    }, 300 + index * 280));
  });
})();
