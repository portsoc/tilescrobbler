export function init(boardEl, rackEl) {
  document.body.addEventListener('dragover', draggingOverBoard);
  boardEl.addEventListener('drop', dropTileOnBoard);
  document.body.addEventListener('drop', dropTileOnBg);

  const tiles = document.querySelectorAll('.tile');
  // console.log('found ', tiles);
  for (const tile of tiles) {
    tile.addEventListener('drag', dragTileStart);
    tile.draggable = true;
  }

  function dropTileOnBg(e) {
    e.preventDefault();
    const dragged = document.querySelector('[data-draggingnow=true]');
    dragged.dataset.draggingnow = false;
    dragged.classList.remove('staged');
    rackEl.append(dragged);
  }

  function draggingOverBoard(e) {
    // if theres not a tile there already it can be dropped on
    if (!e.target.classList.contains('tile')) {
      e.preventDefault();
    }
  }

  function dropTileOnBoard(e) {
    e.preventDefault();
    e.stopPropagation();
    const dragged = document.querySelector('[data-draggingnow=true]');
    dragged.dataset.draggingnow = false;
    dragged.classList.add('staged');
    e.target.append(dragged);
  }


  function dragTileStart(e) {
    console.log('dragging');
    e.target.dataset.draggingnow = true;
  }
}
