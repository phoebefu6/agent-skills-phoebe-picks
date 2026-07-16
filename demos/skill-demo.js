(function () {
  function setActive(buttons, activeButton) {
    buttons.forEach((button) => {
      const active = button === activeButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  document.querySelectorAll("[data-feature-lab]").forEach((lab) => {
    const buttons = Array.from(lab.querySelectorAll("[data-feature]"));
    const panels = Array.from(lab.querySelectorAll("[data-feature-panel]"));

    function showFeature(id, activeButton) {
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.featurePanel === id);
      });
      setActive(buttons, activeButton);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => showFeature(button.dataset.feature, button));
    });

    if (buttons[0]) {
      showFeature(buttons[0].dataset.feature, buttons[0]);
    }
  });

  document.querySelectorAll("[data-state-lab]").forEach((lab) => {
    const screen = lab.querySelector("[data-state-screen]");
    const buttons = Array.from(lab.querySelectorAll("[data-state-button]"));
    if (!screen) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        screen.dataset.screenState = button.dataset.stateButton;
        setActive(buttons, button);
      });
    });
  });

  document.querySelectorAll("[data-mode-lab]").forEach((lab) => {
    const buttons = Array.from(lab.querySelectorAll("[data-mode-button]"));
    const target = lab.querySelector("[data-mode-target]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (target) {
          target.dataset.mode = button.dataset.modeButton;
        }
        setActive(buttons, button);
      });
    });
  });

  document.querySelectorAll("[data-before-after]").forEach((board) => {
    const toggle = board.querySelector("[data-before-after-toggle]");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const next = !board.classList.contains("is-after");
      board.classList.toggle("is-after", next);
      toggle.textContent = next ? "Show before" : "Show after";
    });
  });

  document.querySelectorAll("[data-palette-lab]").forEach((lab) => {
    const buttons = Array.from(lab.querySelectorAll("[data-palette]"));
    const target = lab.querySelector("[data-palette-target]") || document.body;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        target.dataset.palette = button.dataset.palette;
        setActive(buttons, button);
      });
    });
  });

  document.querySelectorAll("[data-run-checks]").forEach((button) => {
    const section = button.closest("section") || document;
    const cards = Array.from(section.querySelectorAll("[data-check]"));
    const result = section.querySelector("[data-check-result]");

    button.addEventListener("click", () => {
      cards.forEach((card, index) => {
        window.setTimeout(() => {
          card.classList.add("is-passed");
          if (result) {
            result.textContent = `${index + 1} checks passed`;
          }
        }, index * 100);
      });
    });
  });

  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    const target = document.querySelector(button.dataset.menuToggle);
    if (!target) return;

    button.addEventListener("click", () => {
      const open = target.toggleAttribute("data-open");
      target.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
      button.textContent = open ? "Close" : "Menu";
    });
  });
})();
