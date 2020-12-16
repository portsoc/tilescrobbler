import rnd from './mulberry32.js';

const el = {};

function makeHTMLGameBoard(boardEl) {
  const quarterBoard = `
    W..l...W
    .w...L..
    ..w...l.
    l..w...l
    ....w...
    .L...L..
    ..l...l.
    W..l...*
  `.trim().split('\n').map(s => s.trim());

  const charToClass = {
    'W': 'ws3',
    'w': 'ws2',
    'L': 'ls3',
    'l': 'ls2',
    '.': '',
    '*': 'ws2 star',
  };

  const elements = [];
  for (let i=0; i<quarterBoard.length * 2 - 1; i+=1) {
    for (let j=0; j<quarterBoard[0].length * 2 - 1; j+=1) {
      const row = i < quarterBoard.length ? i : quarterBoard.length * 2 - 2 - i;
      const col = j < quarterBoard[0].length ? j : quarterBoard[0].length * 2 - 2 - j;
      const char = quarterBoard[row][col];
      const className = charToClass[char];
      if (className == null) throw new TypeError(`quarterBoard contains unknown char "${char}"`);
      const el = document.createElement('div');
      if (className) el.className = className;
      // el.dataset.x = i;
      // el.dataset.y = j;
      elements.push(el);
    }
  }

  boardEl.textContent = '';
  boardEl.append(...elements);
}

function resetBag(bagEl) {
  const tileTypes = [
    { l: 'A', c: 9,  v: 1 },
    { l: 'B', c: 2,  v: 3 },
    { l: 'C', c: 2,  v: 3 },
    { l: 'D', c: 4,  v: 2 },
    { l: 'E', c: 12, v: 1 },
    { l: 'F', c: 2,  v: 4 },
    { l: 'G', c: 3,  v: 2 },
    { l: 'H', c: 2,  v: 4 },
    { l: 'I', c: 9,  v: 1 },
    { l: 'J', c: 1,  v: 8 },
    { l: 'K', c: 1,  v: 5 },
    { l: 'L', c: 4,  v: 1 },
    { l: 'M', c: 2,  v: 3 },
    { l: 'N', c: 6,  v: 1 },
    { l: 'O', c: 8,  v: 1 },
    { l: 'P', c: 2,  v: 3 },
    { l: 'Q', c: 1,  v: 10 },
    { l: 'R', c: 6,  v: 1 },
    { l: 'S', c: 4,  v: 1 },
    { l: 'T', c: 6,  v: 1 },
    { l: 'U', c: 4,  v: 1 },
    { l: 'V', c: 2,  v: 4 },
    { l: 'W', c: 2,  v: 4 },
    { l: 'X', c: 1,  v: 8 },
    { l: 'Y', c: 2,  v: 4 },
    { l: 'Z', c: 1,  v: 10 },
    { l: ' ', c: 200,  v: 0 },

  ]

  document.querySelectorAll('.tile').forEach(el => el.remove());

  for (const tileType of tileTypes) {
    for (let i=0; i<tileType.c; i+=1) {
      const tileEl = document.createElement('div');
      tileEl.classList.add('tile');
      tileEl.dataset.score = tileType.v;
      tileEl.textContent = tileType.l;
      tileEl.dataset.letter = tileType.l;

      if (tileType.v === 0) instrumentBlankTile(tileEl);
      bagEl.append(tileEl);
    }
  }
}

function instrumentBlankTile(tileEl) {
  const input = document.createElement('input');
  input.addEventListener('input', () => {
    // todo change dataset.letter
    let val = input.value.trim().toLowerCase();
    if (val.length > 1) val = val.slice(-1);
    if (val < 'a' || val > 'z') val = '';
    input.value = val;
    tileEl.dataset.letter = val;
  });
  tileEl.append(input);
}

function selectTiles(bagEl, n) {
  const retval = [];
  for (let i=0; i<n && bagEl.children.length; i+=1) {
    const index = Math.floor(rnd() * bagEl.children.length);
    retval.push(bagEl.children[index]);
  }
  return retval;
}

function showUserTiles(rackEl, tiles) {
  rackEl.textContent = '';
  rackEl.append(...tiles);
}

function shuffleRack(rackEl) {
  for (let i = 0; i < rackEl.children.length; i+=1) {
    const index = Math.floor(rnd()*rackEl.children.length);
    rackEl.append(rackEl.children[index]);
  }
}

function recallStaged() {
  const staged = el.board.querySelectorAll(".tile.staged");
  for (const tile of staged) {
    tile.classList.remove('staged');
  }
  el.rack.append(...staged);
}

function isWordValid(w) {
  return true;
}

function findGridSpace(tileOrGridSpace, direction = 'here') {
  const gridSpace = tileOrGridSpace.parentElement === el.board ? tileOrGridSpace : tileOrGridSpace.parentElement;
  if (direction === 'here') return gridSpace;

  const index = Array.from(el.board.children).indexOf(gridSpace);
  if (index === -1) {
    throw new Error('grid space not found');
  }

  let x = index % 15;
  let y = Math.floor(index / 15);

  switch (direction) {
    case 'left':
      x -= 1;
      break;
    case 'right':
      x += 1;
      break;
    case 'up':
      y -= 1;
      break;
    case 'down':
      y += 1;
      break;
    default:
      throw new Error('unknown findGridSpace direction ' + direction);
  }

  if (x < 0 || x >= 15 || y < 0 || y >= 15) return null;
  return el.board.children[x + y * 15];
}

function getGridTile(gridSpace) {
  if (gridSpace == null) return null;
  return gridSpace.querySelector('.tile');
}

function findWordStart(tile, direction) {
  let gridSpace = findGridSpace(tile);
  let nextGridSpace;
  do {
    nextGridSpace = findGridSpace(gridSpace, direction);
    if (getGridTile(nextGridSpace) != null) {
      gridSpace = nextGridSpace;
    } else {
      nextGridSpace = null;
    }
  } while (nextGridSpace);
  return gridSpace;
}

// returns grid spaces that make up a word, or null if there aren't enough tiles there
function getWordSpaces(startTile, direction = 'missing') {
  const retval = [];
  let gridSpace = findGridSpace(startTile);
  while (gridSpace) {
    retval.push(gridSpace);
    gridSpace = findGridSpace(gridSpace, direction);
    if (getGridTile(gridSpace) == null) {
      gridSpace = null;
    }
  };
  if (retval.length < 2) return null;
  return retval;
}

function scoreStagedWord(spaces) {
  if (spaces == null) return 0;

  let wordMultiplier = 1;
  let wordScore = 0;
  for (const space of spaces) {
    let letterMultiplier = 1;
    if (space.classList.contains('ls2')) letterMultiplier *= 2;
    if (space.classList.contains('ls3')) letterMultiplier *= 3;

    if (space.classList.contains('ws2')) wordMultiplier *= 2;
    if (space.classList.contains('ws3')) wordMultiplier *= 3;

    const tile = getGridTile(space);
    wordScore += Number(tile.dataset.score) * letterMultiplier;
  }
  return wordScore * wordMultiplier;
}

function scoreStagedTiles() {
  // find tiles that have class "staged"
  const staged = Array.from(document.querySelectorAll('.tile.staged'));

  // tally all words they are involved in
  const vertWordStarts = new Set(staged.map(tile => findWordStart(tile, 'up')));
  const horizWordStarts = new Set(staged.map(tile => findWordStart(tile, 'left')));

  // add word scores
  let sum = 0;
  for (const wordStart of vertWordStarts) {
    const wordSpaces = getWordSpaces(wordStart, 'down');
    sum += scoreStagedWord(wordSpaces);
  }
  for (const wordStart of horizWordStarts) {
    const wordSpaces = getWordSpaces(wordStart, 'right');
    sum += scoreStagedWord(wordSpaces);
  }

  if (staged.length === 7) sum += 50;

  reportScore(sum);
  return sum;
}

function reportScore(score) {
  if (score === 0) {
    el.theScore.textContent = 'none';
  } else {
    el.theScore.textContent = score;
  }
}

function moveKneadToBoard() {
  let target = el.board.children[108];
  for (const char of 'KNEAD') {
    const rackTile = el.rack.querySelector(`[data-letter='${char}']`);
    if (rackTile) {
      target.append(rackTile);
      target = target.nextElementSibling;
      rackTile.classList.add('staged');
    } else {
      console.log('cannot find tile in rack:', char)
      break;
    }
  }
}

function init() {
  for (const element of document.querySelectorAll('[id]')) {
    el[element.id] = element;
  }

  makeHTMLGameBoard(el.board);
  resetBag(el.bag);

  el.shuffle.addEventListener('click', () => shuffleRack(el.rack));
  el.recall.addEventListener('click', recallStaged);

  const userTiles = selectTiles(el.bag, 7);
  showUserTiles(el.rack, userTiles);

  prepDrag();

  // testing
  moveKneadToBoard();
  scoreStagedTiles();
}

window.addEventListener('load', init);


function draggingOverBoard(e) {
  // if theres not a tile there already it can be dropped on
  if (!e.target.classList.contains("tile")) {
    e.preventDefault();
  }
}

function dragAnywhere(e) {
  e.preventDefault();
}


function dropTileOnBoard(e) {
  e.preventDefault();
  e.stopPropagation();
  const dragged = document.querySelector('[data-draggingnow=true]');
  dragged.dataset.draggingnow = false;
  dragged.classList.add('staged');
  e.target.append(dragged);
  scoreStagedTiles();
}

function dropTileOnBg(e) {
  e.preventDefault();
  const dragged = document.querySelector('[data-draggingnow=true]');
  dragged.dataset.draggingnow = false;
  dragged.classList.remove('staged');
  el.rack.append(dragged);
  scoreStagedTiles();
}



function dragTileStart(e) {
  console.log('dragging');
  e.target.dataset.draggingnow = true;
}


function prepDrag() {

  document.body.addEventListener('dragover', draggingOverBoard);
  el.board.addEventListener('drop', dropTileOnBoard);
  document.body.addEventListener('drop', dropTileOnBg);

	const tiles = document.querySelectorAll(".tile");
  // console.log('found ', tiles);
  for (const tile of tiles) {
	  tile.addEventListener('drag', dragTileStart);
    tile.draggable = true;
  }
}


