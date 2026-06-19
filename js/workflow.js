/* Flux — workflow screen: stage nodes connected by curved links.
   Purely visual in this MVP. */

document.addEventListener("DOMContentLoaded", () => {
  const board = resolveBoard();
  if (!board) {
    document.getElementById("board-name").textContent = "Nenhum kanban";
    return;
  }
  FLUX_STORE.setActiveId(board.id);
  document.getElementById("board-name").textContent = board.name;

  const nodesWrap = document.getElementById("flow-nodes");
  const lastIndex = board.stages.length - 1;
  board.stages.forEach((stage, index) => {
    const node = document.createElement("div");
    node.className = "flow-node";
    // Direction arrows and connectors are purely visual hints, revealed only
    // while hovering this card; the unavailable direction is omitted at the ends.
    const prev = index > 0
      ? `<span class="flow-arrow flow-arrow-prev" aria-hidden="true">◀</span>` : "";
    const next = index < lastIndex
      ? `<span class="flow-arrow flow-arrow-next" aria-hidden="true">▶</span>` : "";
    node.innerHTML = `
      ${prev}
      ${next}
      <div class="flow-node-header">${stage}</div>
      <div class="flow-node-body">
        <button class="edit-card">Editar Card</button>
        <button class="flow-plus" title="Novo card">+</button>
      </div>
    `;
    nodesWrap.appendChild(node);

    // Hovering the card reveals its own arrows and only its adjacent connectors
    // (segment index-1 links the previous stage, segment index the next one).
    // Paths are re-created on resize, so look them up at event time.
    const body = node.querySelector(".flow-node-body");
    const toggle = (on) => {
      node.classList.toggle("is-active", on);
      [index - 1, index].forEach((seg) => {
        if (seg < 0 || seg > lastIndex - 1) return;
        const path = document.getElementById(`connector-${seg}`);
        if (path) path.classList.toggle("active", on);
      });
    };
    body.addEventListener("mouseenter", () => toggle(true));
    body.addEventListener("mouseleave", () => toggle(false));
  });

  drawConnectors(board.stages.length);
  window.addEventListener("resize", () => drawConnectors(board.stages.length));
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

// Draw curved links between the tops of evenly spaced nodes.
function drawConnectors(count) {
  const svg = document.getElementById("connectors");
  svg.innerHTML = "";
  if (count < 2) return;

  const W = 100, H = 20;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const step = W / count;
  for (let i = 0; i < count - 1; i++) {
    const x1 = step * (i + 0.5);
    const x2 = step * (i + 1.5);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M${x1} ${H} C${x1} 2 ${x2} 2 ${x2} ${H}`);
    path.setAttribute("class", "connector-path");
    path.setAttribute("id", `connector-${i}`);
    svg.appendChild(path);
  }
}
