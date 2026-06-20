/* Flux — navbar helpers: highlight active link + hamburger toggle. */

document.addEventListener("DOMContentLoaded", () => {
  // Highlight the link matching the current page.
  const page = location.pathname.split("/").pop() || "home.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Hamburger opens the config screen (its only menu entry in this MVP).
  const burger = document.querySelector(".hamburger");
  if (burger) {
    // Highlight the hamburger when its destination (config) is the current page,
    // mirroring how nav-links flag the active page.
    if (page === "config.html") burger.classList.add("active");
    burger.addEventListener("click", () => { location.href = "config.html"; });
  }
});
