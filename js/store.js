/* Flux — persistence layer over localStorage. Seeds from FLUX_DATA on first
   run; afterwards every screen reads/writes the live state here. No backend. */

const FLUX_STORE = (() => {
  const KEY_KANBANS = "flux.kanbans";
  const KEY_ACTIVE = "flux.activeKanban";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  // Returns the kanban list, seeding it from FLUX_DATA the first time.
  function loadKanbans() {
    const raw = localStorage.getItem(KEY_KANBANS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (_) {
        /* corrupted — fall through to re-seed */
      }
    }
    const seed = clone(FLUX_DATA.kanbans);
    saveKanbans(seed);
    return seed;
  }

  function saveKanbans(list) {
    localStorage.setItem(KEY_KANBANS, JSON.stringify(list));
  }

  function getKanban(id) {
    return loadKanbans().find((k) => k.id === id) || null;
  }

  function updateKanban(kanban) {
    const list = loadKanbans();
    const i = list.findIndex((k) => k.id === kanban.id);
    if (i === -1) list.push(kanban);
    else list[i] = kanban;
    saveKanbans(list);
    return kanban;
  }

  function createKanban(name) {
    const slug = (name || "kanban")
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "kanban";
    const kanban = {
      id: `${slug}-${Date.now().toString(36)}`,
      name: name || "Novo Kanban",
      stages: [],
      columns: {},
    };
    const list = loadKanbans();
    list.push(kanban);
    saveKanbans(list);
    return kanban;
  }

  function deleteKanban(id) {
    saveKanbans(loadKanbans().filter((k) => k.id !== id));
    if (getActiveId() === id) localStorage.removeItem(KEY_ACTIVE);
  }

  function getActiveId() {
    return localStorage.getItem(KEY_ACTIVE);
  }

  function setActiveId(id) {
    localStorage.setItem(KEY_ACTIVE, id);
  }

  return {
    loadKanbans, saveKanbans, getKanban, updateKanban,
    createKanban, deleteKanban, getActiveId, setActiveId,
  };
})();
