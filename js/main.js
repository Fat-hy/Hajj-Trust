// New JS
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".dropdown-container header");

  headers.forEach((header) => {
    header.addEventListener("click", toggleAccordion);
  });

  function toggleAccordion(event) {
    const parent = event.currentTarget.parentElement;
    const article = parent.querySelector("article");

    // Close other open containers if needed
    document
      .querySelectorAll(".dropdown-container.open")
      .forEach((openContainer) => {
        if (openContainer !== parent) {
          openContainer.classList.remove("open");
          openContainer.querySelector("article").style.maxHeight = "0px";
        }
      });

    // Toggle the current container
    if (!parent.classList.contains("open")) {
      parent.classList.add("open");
      article.style.maxHeight = article.scrollHeight + "px";
    } else {
      parent.classList.remove("open");
      article.style.maxHeight = "0px";
    }
  }
});