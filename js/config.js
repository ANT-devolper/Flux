/* Flux — config screen: fill profile + wire appearance toggles.
   Effects are visual only (no persistence). */

document.addEventListener("DOMContentLoaded", () => {
  // Profile from mock data.
  document.getElementById("p-name").textContent = FLUX_DATA.profile.name;
  document.getElementById("p-email").textContent = FLUX_DATA.profile.email;
  document.getElementById("p-role").textContent = FLUX_DATA.profile.role;

  // Hide / show background waves.
  const waves = document.querySelector(".waves");
  document.getElementById("t-waves").addEventListener("change", (e) => {
    if (waves) waves.style.display = e.target.checked ? "none" : "";
  });

  // Compact cards (decorative class on body).
  document.getElementById("t-compact").addEventListener("change", (e) => {
    document.body.classList.toggle("compact", e.target.checked);
  });

  // Fluid animations toggle.
  document.getElementById("t-anim").addEventListener("change", (e) => {
    document.body.classList.toggle("no-anim", !e.target.checked);
  });

  // Custom accent colour, applied only when the custom mode is on.
  const picker = document.getElementById("accent-picker");
  const custom = document.getElementById("t-custom");
  const applyAccent = () => {
    document.documentElement.style.setProperty(
      "--accent", custom.checked ? picker.value : "#e8841f");
  };
  picker.addEventListener("input", applyAccent);
  custom.addEventListener("change", applyAccent);
});
