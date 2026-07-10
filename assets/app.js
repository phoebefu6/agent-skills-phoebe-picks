(function () {
  const reviews = window.REVIEWS || [];
  const rubric = window.RUBRIC || [];
  const source = window.REVIEW_SOURCE || {};
  const categories = ["All", ...Array.from(new Set(reviews.map((review) => review.category)))];
  const state = {
    query: "",
    category: "All",
    sort: "score",
    selectedId: reviews[0] ? reviews[0].id : null
  };

  const byId = (id) => document.getElementById(id);

  function scoreClass(score) {
    if (score >= 88) return "score-a";
    if (score >= 80) return "score-b";
    if (score >= 72) return "score-c";
    return "score-d";
  }

  function statusLabel(status) {
    if (status === "priority") return "Phoebe pick";
    return status.replace("-", " ");
  }

  function selectedReview() {
    return reviews.find((review) => review.id === state.selectedId) || reviews[0];
  }

  function filteredReviews() {
    const query = state.query.trim().toLowerCase();
    return reviews
      .filter((review) => state.category === "All" || review.category === state.category)
      .filter((review) => {
        if (!query) return true;
        return [
          review.name,
          review.category,
          review.status,
          review.summary,
          review.evidence,
          review.agentUse,
          review.tags.join(" ")
        ].join(" ").toLowerCase().includes(query);
      })
      .sort((a, b) => {
        if (state.sort === "name") return a.name.localeCompare(b.name);
        if (state.sort === "status") return a.status.localeCompare(b.status) || b.score - a.score;
        return b.score - a.score || a.name.localeCompare(b.name);
      });
  }

  function renderStats() {
    const average = reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length;
    const top = Math.max(...reviews.map((review) => review.score));
    const avgScore = byId("avgScore");
    const reviewCount = byId("reviewCount");
    const priorityCount = byId("priorityCount");
    const categoryCount = byId("categoryCount");
    const topScore = byId("topScore");
    const sparkline = byId("scoreSparkline");
    const topCategoryList = byId("topCategoryList");

    if (avgScore) avgScore.textContent = Math.round(average);
    if (reviewCount) reviewCount.textContent = reviews.length;
    if (priorityCount) priorityCount.textContent = reviews.filter((review) => review.status === "priority").length;
    if (categoryCount) categoryCount.textContent = categories.length - 1;
    if (topScore) topScore.textContent = top;
    if (sparkline) {
      sparkline.innerHTML = reviews
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((review) => `<span title="${review.name}: ${review.score}" style="height:${review.score}%"></span>`)
        .join("");
    }
    if (topCategoryList) {
      topCategoryList.innerHTML = categories
        .filter((category) => category !== "All")
        .map((category) => {
          const clusterReviews = reviews.filter((review) => review.category === category);
          const best = Math.max(...clusterReviews.map((review) => review.score));
          return `
            <button class="category-row" type="button" data-category="${category}">
              <span><strong>${clusterReviews.length}</strong>${category}</span>
              <i>${best}</i>
            </button>
          `;
        })
        .join("");
      topCategoryList.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          state.category = button.dataset.category;
          const select = byId("categorySelect");
          if (select) select.value = state.category;
          const firstVisible = filteredReviews()[0];
          if (firstVisible) state.selectedId = firstVisible.id;
          renderReviews();
          renderDetail();
          byId("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }
  }

  function renderRubric() {
    const root = byId("rubricGrid");
    if (!root) return;
    root.innerHTML = rubric
      .map((item, index) => `
        <article>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${item.label}</strong>
          <p>${item.description}</p>
        </article>
      `)
      .join("");
  }

  function renderControls() {
    const categorySelect = byId("categorySelect");
    if (categorySelect && !categorySelect.children.length) {
      categorySelect.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
    }
  }

  function renderTopCatalog() {
    const root = byId("topCatalogList");
    if (!root) return;
    const catalog = [...reviews].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
    root.innerHTML = catalog
      .map((review, index) => `
        <button class="top-skill-row" type="button" data-id="${review.id}">
          <span class="top-skill-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="top-skill-main">
            <strong>${review.name}</strong>
            <small>${review.summary}</small>
          </span>
          <span class="top-skill-side">
            <i>${statusLabel(review.status)}</i>
            <b>${review.score}</b>
          </span>
        </button>
      `)
      .join("");
    root.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedId = button.dataset.id;
        state.category = "All";
        const select = byId("categorySelect");
        if (select) select.value = state.category;
        renderReviews();
        renderDetail();
        byId("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function metricBars(review) {
    return Object.entries(review.rubric)
      .map(([key, value]) => {
        const label = rubric.find((item) => item.key === key)?.label || key;
        return `
          <div class="metric-row">
            <span>${label}</span>
            <div class="metric-track"><i style="width:${value * 5}%"></i></div>
            <strong>${value}</strong>
          </div>
        `;
      })
      .join("");
  }

  function renderReviewCard(review) {
    const active = review.id === state.selectedId ? " is-active" : "";
    return `
      <button class="review-card${active}" type="button" data-id="${review.id}">
        <span class="review-score ${scoreClass(review.score)}">${review.score}</span>
        <span class="review-main">
          <span class="review-kicker">${review.category} / ${statusLabel(review.status)}</span>
          <strong>${review.name}</strong>
          <small>${review.summary}</small>
        </span>
        <span class="review-tags">
          ${review.tags.slice(0, 3).map((tag) => `<i>${tag}</i>`).join("")}
        </span>
      </button>
    `;
  }

  function listItems(items) {
    return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function renderDetail() {
    const root = byId("detailPanel");
    const review = selectedReview();
    if (!root || !review) return;
    root.innerHTML = `
      <div class="detail-top">
        <p class="eyebrow">Selected review</p>
        <h3>${review.name}</h3>
        <a href="${review.sourceUrl}" target="_blank" rel="noreferrer">Open source</a>
      </div>
      <div class="detail-score">
        <strong>${review.score}</strong>
        <span>${review.category}</span>
      </div>
      <section>
        <h4>Abstract</h4>
        <p>${review.summary}</p>
      </section>
      <section>
        <h4>Evidence Note</h4>
        <p>${review.evidence}</p>
      </section>
      <section>
        <h4>Agent Use</h4>
        <p>${review.agentUse}</p>
      </section>
      <section>
        <h4>Rubric</h4>
        <div class="metric-stack">${metricBars(review)}</div>
      </section>
      <section class="two-col">
        <div>
          <h4>Strengths</h4>
          ${listItems(review.strengths)}
        </div>
        <div>
          <h4>Gaps</h4>
          ${listItems(review.gaps)}
        </div>
      </section>
      <section>
        <h4>Test Next</h4>
        <p>${review.testNext}</p>
      </section>
      <section>
        <h4>Source Corpus</h4>
        <p>${source.name || "Source"} captured ${source.captured || "for seed review"}.</p>
      </section>
    `;
  }

  function renderReviews() {
    const root = byId("reviewList");
    if (!root) return;
    const visible = filteredReviews();
    root.innerHTML = visible.length
      ? visible.map(renderReviewCard).join("")
      : `<div class="empty-state"><strong>No matching reviews</strong><span>Try another cluster or query.</span></div>`;
    root.querySelectorAll(".review-card").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedId = button.dataset.id;
        renderReviews();
        renderDetail();
      });
    });
  }

  function bindEvents() {
    const search = byId("searchInput");
    const category = byId("categorySelect");
    const sort = byId("sortSelect");

    if (search) {
      search.addEventListener("input", (event) => {
        state.query = event.target.value;
        renderReviews();
      });
    }

    if (category) {
      category.addEventListener("change", (event) => {
        state.category = event.target.value;
        renderReviews();
      });
    }

    if (sort) {
      sort.addEventListener("change", (event) => {
        state.sort = event.target.value;
        renderReviews();
      });
    }
  }

  renderStats();
  renderRubric();
  renderControls();
  renderTopCatalog();
  renderReviews();
  renderDetail();
  bindEvents();
})();
