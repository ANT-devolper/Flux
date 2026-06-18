/* Flux — home screen: render kanban list + templates from mock data. */

document.addEventListener("DOMContentLoaded", () => {
  const kanbanGrid = document.getElementById("kanban-grid");
  const templateGrid = document.getElementById("template-grid");

  // "Meus Kanban's" — each card opens the board.
  FLUX_DATA.myKanbans.forEach((name) => {
    const card = document.createElement("a");
    card.className = "board-card";
    card.href = "kanban.html";
    card.textContent = name;
    kanbanGrid.appendChild(card);
  });

  // "Criar Novo Kanban" — highlighted action card (decorative).
  const create = document.createElement("button");
  create.className = "board-card create-card";
  create.textContent = "Criar Novo Kanban";
  kanbanGrid.appendChild(create);

  // Templates — decorative highlighted cards.
  FLUX_DATA.templates.forEach((name) => {
    const card = document.createElement("button");
    card.className = "board-card template-card";
    card.textContent = name;
    templateGrid.appendChild(card);
  });
});
