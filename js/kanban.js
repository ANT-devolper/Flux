/* Flux — kanban board: render columns + task cards from mock data.
   Adding cards works in memory only (no persistence). */

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  document.getElementById("board-name").textContent = FLUX_DATA.board.name;

  FLUX_DATA.board.stages.forEach((stage) => {
    board.appendChild(buildColumn(stage, FLUX_DATA.board.columns[stage] || []));
  });

  // Extra "Novo Card" column (orange) at the end.
  board.appendChild(buildNewColumn());
});

function buildColumn(stage, cards) {
  const col = document.createElement("div");
  col.className = "column";

  const header = document.createElement("div");
  header.className = "column-header";
  header.textContent = stage;
  col.appendChild(header);

  const list = document.createElement("div");
  list.className = "card-list";
  cards.forEach((c) => list.appendChild(buildCard(c)));
  col.appendChild(list);

  const add = document.createElement("button");
  add.className = "add-card";
  add.textContent = "+";
  add.title = "Adicionar card";
  add.addEventListener("click", () => {
    list.appendChild(buildCard({
      title: "Nova tarefa", prazo: "--/--", status: "orange",
      para: "—", detalhes: "Descreva a tarefa",
    }));
  });
  col.appendChild(add);

  return col;
}

function buildCard(c) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.innerHTML = `
    <div class="task-title">${c.title}</div>
    <div class="task-row">
      <span><strong>Prazo:</strong> ${c.prazo}</span>
      <span class="dot dot-${c.status}"></span>
    </div>
    <div class="task-row"><strong>Para:</strong> ${c.para}</div>
    <div class="task-detalhes"><strong>Detalhes:</strong> ${c.detalhes}</div>
  `;
  return card;
}

function buildNewColumn() {
  const col = document.createElement("div");
  col.className = "column new-column";
  col.innerHTML = `
    <div class="column-header new-header">Novo Card</div>
    <button class="new-plus" title="Novo card">+</button>
  `;
  return col;
}
