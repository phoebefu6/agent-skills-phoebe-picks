(function () {
  const stateContent = {
    review: {
      label: "Review queue",
      title: "3 Skills need a product-design proof.",
      cards: [
        ["frontend-design", "Build the product surface", "Real UI states"],
        ["canvas-design", "Make the visual philosophy", "90% visual"],
        ["emil-design-eng", "Polish the interaction feel", "Motion rules"]
      ]
    },
    empty: {
      label: "Empty state",
      title: "No Skill is ready for recommendation yet.",
      cards: [
        ["Start with a brief", "Name audience, job, and product risk", "Next action"],
        ["Find credible source", "Check stars, audits, and fit", "Gate"],
        ["Build proof", "Create a demo before publishing", "Proof"]
      ]
    },
    published: {
      label: "Published",
      title: "Useful Skills become visible picks.",
      cards: [
        ["Source", "Repo, path, and star snapshot are shown", "Trust"],
        ["Rating", "3 strengths and 3 limits stay visible", "Judgment"],
        ["Demo", "Followers can open the artifact directly", "Proof"]
      ]
    }
  };

  const byId = (id) => document.getElementById(id);
  const grid = byId("signalGrid");
  const label = byId("stateLabel");
  const title = byId("stateTitle");
  const toast = byId("toast");
  const popover = byId("fitPopover");
  const popoverTrigger = byId("popoverTrigger");
  let toastTimer = null;

  function renderState(id) {
    const content = stateContent[id] || stateContent.review;
    label.textContent = content.label;
    title.textContent = content.title;
    grid.innerHTML = content.cards
      .map(([name, description, tag]) => `
        <article class="signal-card">
          <small>${tag}</small>
          <strong>${name}</strong>
          <p>${description}</p>
        </article>
      `)
      .join("");

    document.querySelectorAll("[data-product-state]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.productState === id);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2200);
  }

  document.addEventListener("click", (event) => {
    const stateButton = event.target.closest("[data-product-state]");
    if (stateButton) {
      renderState(stateButton.dataset.productState);
      return;
    }

    const toastButton = event.target.closest("[data-toast]");
    if (toastButton) {
      showToast(toastButton.dataset.toast);
      return;
    }

    if (event.target === popoverTrigger) {
      popover.hidden = !popover.hidden;
      return;
    }

    if (!event.target.closest(".popover-demo")) {
      popover.hidden = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      popover.hidden = true;
      toast.hidden = true;
    }
  });

  renderState("review");
})();
