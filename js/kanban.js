/* Flux — kanban board: render columns + cards for the selected board.
   Everything is editable inline and persisted to localStorage via FLUX_STORE.
   Cards can be dragged (by their handle) between/within columns; the new
   position is persisted. */

let BOARD = null;
let DRAG = null; // { fromStage, card } while a card is being dragged

document.addEventListener("DOMContentLoaded", () => {
  BOARD = resolveBoard();
  if (!BOARD) {
    document.getElementById("board-name").textContent = "Nenhum kanban";
    return;
  }
  FLUX_STORE.setActiveId(BOARD.id);
  render();
});

// Pick the board from ?id=, then the active id, then the first kanban.
function resolveBoard() {
  const list = FLUX_STORE.loadKanbans();
  const param = new URLSearchParams(location.search).get("id");
  return (
    (param && list.find((k) => k.id === param)) ||
    (FLUX_STORE.getActiveId() && list.find((k) => k.id === FLUX_STORE.getActiveId())) ||
    list[0] ||
    null
  );
}

function save() {
  FLUX_STORE.updateKanban(BOARD);
}

function render() {
  const board = document.getElementById("board");
  document.getElementById("board-name").textContent = BOARD.name;
  board.innerHTML = "";

  BOARD.stages.forEach((stage) => board.appendChild(buildColumn(stage)));
  board.appendChild(buildAddColumn());
}

function buildColumn(stage) {
  const col = document.createElement("div");
  col.className = "column";

  const header = document.createElement("div");
  header.className = "column-header";

  const name = document.createElement("span");
  name.className = "column-name";
  name.textContent = stage;
  name.contentEditable = "true";
  name.addEventListener("blur", () => renameStage(stage, name.textContent.trim()));
  header.appendChild(name);

  const del = document.createElement("button");
  del.className = "column-delete";
  del.title = "Excluir coluna";
  del.textContent = "×";
  del.addEventListener("click", () => {
    if (confirm(`Excluir a coluna "${stage}" e seus cards?`)) deleteStage(stage);
  });
  header.appendChild(del);

  col.appendChild(header);

  const list = document.createElement("div");
  list.className = "card-list";
  (BOARD.columns[stage] || []).forEach((card) => list.appendChild(buildCard(stage, card)));

  // Drop target: allow dropping dragged cards into this column.
  list.addEventListener("dragover", (e) => {
    if (!DRAG) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    list.classList.add("drag-over");
  });
  list.addEventListener("dragleave", (e) => {
    if (!list.contains(e.relatedTarget)) list.classList.remove("drag-over");
  });
  list.addEventListener("drop", (e) => {
    if (!DRAG) return;
    e.preventDefault();
    list.classList.remove("drag-over");
    moveCard(DRAG.fromStage, DRAG.card, stage, getDropIndex(list, e.clientY));
  });

  col.appendChild(list);

  const add = document.createElement("button");
  add.className = "add-card";
  add.textContent = "+";
  add.title = "Adicionar card";
  add.addEventListener("click", () => {
    const card = { title: "Nova tarefa", prazo: "--/--", status: "orange",
      para: "—", detalhes: "Descreva a tarefa" };
    BOARD.columns[stage].push(card);
    save();
    list.appendChild(buildCard(stage, card));
  });
  col.appendChild(add);

  return col;
}

function buildCard(stage, c) {
  const card = document.createElement("article");
  card.className = "task-card";

  // Drag handle: dragging is only enabled while grabbing the handle, so the
  // inline-editable fields keep working normally.
  const handle = document.createElement("span");
  handle.className = "drag-handle";
  handle.title = "Arrastar";
  handle.textContent = "⠿";
  handle.addEventListener("mousedown", () => { card.draggable = true; });
  card.appendChild(handle);

  card.addEventListener("dragstart", (e) => {
    DRAG = { fromStage: stage, card: c };
    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    card.draggable = false;
    DRAG = null;
    document.querySelectorAll(".card-list.drag-over")
      .forEach((el) => el.classList.remove("drag-over"));
  });

  const del = document.createElement("button");
  del.className = "task-delete";
  del.title = "Excluir card";
  del.textContent = "×";
  del.addEventListener("click", () => {
    BOARD.columns[stage] = BOARD.columns[stage].filter((x) => x !== c);
    save();
    card.remove();
  });
  card.appendChild(del);

  const title = editable("task-title", c.title, (v) => { c.title = v; save(); });
  card.appendChild(title);

  const row = document.createElement("div");
  row.className = "task-row";
  const prazoWrap = document.createElement("span");
  prazoWrap.innerHTML = "<strong>Prazo:</strong> ";
  prazoWrap.appendChild(editable("task-prazo", c.prazo, (v) => { c.prazo = v; save(); }, true));
  row.appendChild(prazoWrap);

  const dot = document.createElement("span");
  dot.className = `dot dot-${c.status}`;
  dot.title = "Alternar status";
  dot.addEventListener("click", () => {
    const order = ["red", "orange", "green"];
    c.status = order[(order.indexOf(c.status) + 1) % order.length];
    dot.className = `dot dot-${c.status}`;
    save();
  });
  row.appendChild(dot);
  card.appendChild(row);

  const paraRow = document.createElement("div");
  paraRow.className = "task-row";
  paraRow.innerHTML = "<strong>Para:</strong> ";
  paraRow.appendChild(editable("task-para", c.para, (v) => { c.para = v; save(); }, true));
  card.appendChild(paraRow);

  const det = document.createElement("div");
  det.className = "task-detalhes";
  det.innerHTML = "<strong>Detalhes:</strong> ";
  det.appendChild(editable("task-det", c.detalhes, (v) => { c.detalhes = v; save(); }, true));
  card.appendChild(det);

  return card;
}

// Inline-editable span. `inline` keeps it flowing with the preceding label.
function editable(cls, value, onChange, inline) {
  const el = document.createElement(inline ? "span" : "div");
  el.className = cls + " editable";
  el.contentEditable = "true";
  el.textContent = value;
  el.addEventListener("blur", () => onChange(el.textContent.trim()));
  return el;
}

function buildAddColumn() {
  const col = document.createElement("div");
  col.className = "column new-column";
  const header = document.createElement("div");
  header.className = "column-header new-header";
  header.textContent = "Nova Coluna";
  const add = document.createElement("button");
  add.className = "new-plus";
  add.title = "Adicionar coluna";
  add.textContent = "+";
  add.addEventListener("click", addStage);
  col.appendChild(header);
  col.appendChild(add);
  return col;
}

function addStage() {
  let name = "Nova Coluna";
  let n = 2;
  while (BOARD.stages.includes(name)) name = `Nova Coluna ${n++}`;
  BOARD.stages.push(name);
  BOARD.columns[name] = [];
  save();
  render();
}

function renameStage(oldName, newName) {
  if (!newName || newName === oldName) return render();
  if (BOARD.stages.includes(newName)) return render(); // avoid duplicate keys
  BOARD.stages = BOARD.stages.map((s) => (s === oldName ? newName : s));
  BOARD.columns[newName] = BOARD.columns[oldName] || [];
  delete BOARD.columns[oldName];
  save();
  render();
}

function deleteStage(stage) {
  BOARD.stages = BOARD.stages.filter((s) => s !== stage);
  delete BOARD.columns[stage];
  save();
  render();
}

// Move a card to toStage at toIndex, persist, and re-render.
function moveCard(fromStage, card, toStage, toIndex) {
  const from = BOARD.columns[fromStage];
  const i = from.indexOf(card);
  if (i === -1) return;
  from.splice(i, 1);
  // Removing an earlier item in the same column shifts the target index back.
  if (fromStage === toStage && i < toIndex) toIndex--;
  BOARD.columns[toStage].splice(toIndex, 0, card);
  save();
  render();
}

// Index (0..n) where the dragged card should land, based on cursor Y.
function getDropIndex(listEl, y) {
  const cards = [...listEl.querySelectorAll(".task-card:not(.dragging)")];
  for (let i = 0; i < cards.length; i++) {
    const box = cards[i].getBoundingClientRect();
    if (y < box.top + box.height / 2) return i;
  }
  return cards.length;
}
