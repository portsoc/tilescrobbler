export function init(boardEl, rackEl) {
  // set up event listeners for all relevant drag events
  document.body.addEventListener('dragover', checkIfDropAllowed);
  boardEl.addEventListener('drop', dropTileOnBoard);
  document.body.addEventListener('drop', dropTileOutsideBoard);

  const tiles = document.querySelectorAll('.tile');
  for (const tile of tiles) {
    tile.addEventListener('dragstart', dragTileStart);
    tile.addEventListener('dragend', dragTileEnd);
    tile.draggable = true;
  }

  // the following functions are defined inside init() so they have access to boardEl, rackEl

  // note the tile that's being dragged
  function dragTileStart(e) {
    e.target.dataset.draggingnow = 'true';
  }

  function dragTileEnd(e) {
    delete e.target.dataset.draggingnow;
  }

  function checkIfDropAllowed(e) {
    // the only place we cannot drop tiles is on other tiles
    if (!e.target.classList.contains('tile') || containsTile(e.target)) {
      e.preventDefault();
    }
  }

  // TODO this check doesn't quite work
  function containsTile(el) {
    return el.querySelector('.tile') != null;
  }

  function dropTileOnBoard(e) {
    e.preventDefault();

    // don't send the drop event outside the board, i.e. to the parent DOM element
    e.stopPropagation();

    const dragged = document.querySelector('[data-draggingnow=true]');
    dragged.classList.add('staged');
    e.target.append(dragged);
  }

  function dropTileOutsideBoard(e) {
    e.preventDefault();
    const dragged = document.querySelector('[data-draggingnow=true]');
    dragged.classList.remove('staged');
    rackEl.append(dragged);
  }
}
