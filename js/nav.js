/* Flux — navbar helpers: highlight active link + hamburger toggle. */

document.addEventListener("DOMContentLoaded", () => {
  // Highlight the link matching the current page.
  const page = location.pathname.split("/").pop() || "home.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Hamburger is decorative in this MVP — just toggle a class for feedback.
  const burger = document.querySelector(".hamburger");
  if (burger) {
    burger.addEventListener("click", () => burger.classList.toggle("open"));
  }
});
