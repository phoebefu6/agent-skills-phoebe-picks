const filterGroups = document.querySelectorAll("[data-filter-group]");

filterGroups.forEach((group) => {
  const buttons = group.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-scenario]");
  const empty = document.querySelector("[data-empty-state]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      let visibleCount = 0;
      cards.forEach((card) => {
        const scenarios = card.dataset.scenario.split(" ");
        const isVisible = filter === "all" || scenarios.includes(filter);
        card.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (empty) {
        empty.classList.toggle("is-visible", visibleCount === 0);
      }
    });
  });
});

