/* Flux — config screen: fill profile + wire appearance toggles. Preferences are
   persisted via FLUX_STORE and applied live (and on every page) via
   FLUX_SETTINGS. The Dark Mode toggle is decorative (the theme is always dark).*/

document.addEventListener("DOMContentLoaded", () => {
  // Profile from mock data.
  document.getElementById("p-name").textContent = FLUX_DATA.profile.name;
  document.getElementById("p-email").textContent = FLUX_DATA.profile.email;
  document.getElementById("p-role").textContent = FLUX_DATA.profile.role;

  const compact = document.getElementById("t-compact");
  const anim = document.getElementById("t-anim");
  const waves = document.getElementById("t-waves");
  const picker = document.getElementById("accent-picker");
  const custom = document.getElementById("t-custom");

  // Reflect the saved settings in the controls.
  const settings = FLUX_STORE.loadSettings();
  compact.checked = settings.compact;
  anim.checked = settings.anim;
  waves.checked = settings.hideWaves;
  custom.checked = settings.customAccent;
  picker.value = settings.accent;

  // Persist the current control state and apply it live across the page.
  const commit = () => {
    const next = {
      compact: compact.checked,
      anim: anim.checked,
      hideWaves: waves.checked,
      customAccent: custom.checked,
      accent: picker.value,
    };
    FLUX_STORE.saveSettings(next);
    FLUX_SETTINGS.apply(next);
  };

  compact.addEventListener("change", commit);
  anim.addEventListener("change", commit);
  waves.addEventListener("change", commit);
  custom.addEventListener("change", commit);
  picker.addEventListener("input", commit);
});
