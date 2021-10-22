import * as board from './board.js';
import * as drag from './drag.js';
import * as tiles from './tiles.js';

function init() {
  const el = {};
  for (const element of document.querySelectorAll('[id]')) {
    el[element.id] = element;
  }

  board.makeHTMLGameBoard(el.board);

  tiles.resetBag(el.bag);
  const userTiles = tiles.selectTiles(el.bag, 7);
  tiles.showUserTiles(el.rack, userTiles);

  drag.init(el.board, el.rack);
}

window.addEventListener('load', init);
