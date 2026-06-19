/* Flux — home screen: list kanbans from localStorage, create + delete them. */

document.addEventListener("DOMContentLoaded", () => {
  const kanbanGrid = document.getElementById("kanban-grid");
  const templateGrid = document.getElementById("template-grid");

  renderKanbans();

  // Templates — decorative highlighted cards (no behavior in this MVP).
  FLUX_DATA.templates.forEach((name) => {
    const card = document.createElement("button");
    card.className = "board-card template-card";
    card.textContent = name;
    templateGrid.appendChild(card);
  });

  function renderKanbans() {
    kanbanGrid.innerHTML = "";

    FLUX_STORE.loadKanbans().forEach((kanban) => {
      const card = document.createElement("a");
      card.className = "board-card";
      card.href = `kanban.html?id=${encodeURIComponent(kanban.id)}`;
      card.addEventListener("click", () => FLUX_STORE.setActiveId(kanban.id));

      const label = document.createElement("span");
      label.textContent = kanban.name;
      card.appendChild(label);

      const del = document.createElement("button");
      del.className = "card-delete";
      del.title = "Excluir kanban";
      del.textContent = "×";
      del.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(`Excluir o kanban "${kanban.name}"?`)) {
          FLUX_STORE.deleteKanban(kanban.id);
          renderKanbans();
        }
      });
      card.appendChild(del);

      kanbanGrid.appendChild(card);
    });

    // "Criar Novo Kanban" — creates an empty board (no columns) and opens it.
    const create = document.createElement("button");
    create.className = "board-card create-card";
    create.textContent = "Criar Novo Kanban";
    create.addEventListener("click", () => {
      const name = prompt("Nome do novo kanban:", "Novo Kanban");
      if (name === null) return;
      const kanban = FLUX_STORE.createKanban(name.trim() || "Novo Kanban");
      FLUX_STORE.setActiveId(kanban.id);
      location.href = `kanban.html?id=${encodeURIComponent(kanban.id)}`;
    });
    kanbanGrid.appendChild(create);
  }
});
