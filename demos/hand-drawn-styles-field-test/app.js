(function () {
  const styles = [
    ["3.1", "Raw kid-scrawl family crayon", "Raw + playful", "A reference-anchored family submission style with deliberately unruly crayon tracks."],
    ["1", "Minimal black-and-white explainer", "Explain", "An xkcd-like stick-figure comic with thin outlines and panel-by-panel teaching."],
    ["2", "Five-year-old crayon bad art", "Raw + playful", "Clumsy proportions, wobbly marks, and coloring that refuses to stay inside the lines."],
    ["3", "Ghibli-inspired hand-drawn anime", "Retro + animation", "One calm focal subject, simplified scenery, watercolor gradients, and warm cinematic light."],
    ["4", "Bean character doodle infographic", "Explain", "The same black blob character carries a vertical, orange-accented visual sequence."],
    ["5", "MS Paint bad doodle", "Raw + playful", "Mouse-drawn wobble, broken lines, wrong proportions, and intentionally poor digital fill."],
    ["6", "Ballpoint single-line scribble", "Drawn media", "Fast overlapping black ballpoint lines build volume without polished contours."],
    ["7", "Photographed real-kid crayon", "Raw + playful", "A bright cellphone photo of sparse, messy wax crayon on real wrinkled paper."],
    ["8", "Freehand ink wash", "Drawn media", "Expressive Chinese ink, dry brush, blooms, negative space, and one red seal."],
    ["9", "Retro pixel", "Retro + animation", "A compact pixel-art recipe with a deliberately limited color system."],
    ["10", "Emotional light-wash sketch", "Drawn media", "A narrative sketch carried by restrained watercolor and feeling-first composition."],
    ["11", "Retro animation watercolor concept", "Retro + animation", "A 2D watercolor treatment shaped like an older animation concept painting."],
    ["12", "Warm-light children's concept art", "Retro + animation", "A warm, childlike animation concept with gentle light and storybook softness."],
    ["13", "Nordic paper folk", "Dimensional", "Layered Scandinavian paper-cut forms with handcrafted depth."],
    ["14", "Nordic storybook gouache", "Storybook", "Opaque Nordic picture-book paint with simple shapes and quiet charm."],
    ["15", "Big-nose soft vinyl", "Dimensional", "A soft, rounded vinyl character language with a distinctive oversized nose."],
    ["16", "Gouache spotlight character", "Dimensional", "A centered gouache character study staged under a focused pool of light."],
    ["17", "Inked storybook", "Storybook", "Expressive ink contours and a literary picture-book atmosphere."],
    ["18", "Warm flat storybook", "Storybook", "Warm, flat shapes and readable storytelling with minimal dimensional shading."]
  ];

  const filterRoot = document.getElementById("styleFilters");
  const grid = document.getElementById("styleGrid");
  const groups = ["All", ...new Set(styles.map((style) => style[2]))];
  let active = "All";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderFilters() {
    filterRoot.innerHTML = groups.map((group) => (
      `<button class="filter-button${active === group ? " is-active" : ""}" type="button" data-group="${escapeHtml(group)}" aria-pressed="${active === group}">${escapeHtml(group)}</button>`
    )).join("");
  }

  function renderStyles() {
    grid.innerHTML = styles
      .filter((style) => active === "All" || style[2] === active)
      .map((style) => `
        <article class="style-card${style[0] === "4" ? " is-used" : ""}">
          <span class="style-number">Recipe ${escapeHtml(style[0])} · ${escapeHtml(style[2])}</span>
          ${style[0] === "4" ? '<span class="used-stamp">Used today</span>' : ""}
          <h3>${escapeHtml(style[1])}</h3>
          <p>${escapeHtml(style[3])}</p>
        </article>
      `).join("");
  }

  filterRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-group]");
    if (!button) return;
    active = button.dataset.group;
    renderFilters();
    renderStyles();
  });

  renderFilters();
  renderStyles();
})();
