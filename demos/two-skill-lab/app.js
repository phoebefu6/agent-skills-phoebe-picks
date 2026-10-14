const branchButtons = document.querySelectorAll("[data-branch]");
const detailPanels = document.querySelectorAll("[data-details]");

branchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.branch;
    branchButtons.forEach((item) => item.setAttribute("aria-expanded", String(item === button)));
    detailPanels.forEach((panel) => {
      panel.hidden = panel.dataset.details !== selected;
    });
  });
});

const copyButton = document.querySelector("[data-copy]");
const copyStatus = document.querySelector("#copy-status");

copyButton?.addEventListener("click", async () => {
  const prompt = document.querySelector("#practice-prompt")?.textContent?.trim() || "";
  try {
    await navigator.clipboard.writeText(prompt);
    copyStatus.textContent = "Copied";
    copyButton.textContent = "Copied!";
    window.setTimeout(() => {
      copyStatus.textContent = "";
      copyButton.textContent = "Copy prompt";
    }, 1800);
  } catch {
    copyStatus.textContent = "Select the prompt and copy it manually.";
  }
});
