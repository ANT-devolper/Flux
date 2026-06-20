/* Flux — applies the saved appearance settings to the current page. Loaded on
   every screen (after store.js) so preferences chosen in Config follow the user
   everywhere. Runs immediately: the script sits at the end of <body>, so
   document.body already exists and there's no flash of the default theme. */

const FLUX_SETTINGS = (() => {
  function apply(s) {
    document.body.classList.toggle("compact", s.compact);
    document.body.classList.toggle("no-anim", !s.anim);
    document.body.classList.toggle("hide-waves", s.hideWaves);
    if (s.customAccent) {
      document.documentElement.style.setProperty("--accent", s.accent);
    } else {
      document.documentElement.style.removeProperty("--accent"); // let base.css win
    }
  }

  apply(FLUX_STORE.loadSettings());

  return { apply };
})();
