import rnd from './lib/mulberry32.js';

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

export function selectTiles(bagEl, n) {
  const retval = [];
  for (let i = 0; i < n && bagEl.children.length; i += 1) {
    const index = Math.floor(rnd() * bagEl.children.length);
    retval.push(bagEl.children[index]);
  }
  return retval;
}

export function showUserTiles(rackEl, tiles) {
  rackEl.textContent = '';
  rackEl.append(...tiles);
  tiles.forEach((tile, index) => { tile.dataset.index = index; });
}

export function resetBag(bagEl) {
  const tileTypes = [
    { l: 'A', c: 9, v: 1 },
    { l: 'B', c: 2, v: 3 },
    { l: 'C', c: 2, v: 3 },
    { l: 'D', c: 4, v: 2 },
    { l: 'E', c: 12, v: 1 },
    { l: 'F', c: 2, v: 4 },
    { l: 'G', c: 3, v: 2 },
    { l: 'H', c: 2, v: 4 },
    { l: 'I', c: 9, v: 1 },
    { l: 'J', c: 1, v: 8 },
    { l: 'K', c: 1, v: 5 },
    { l: 'L', c: 4, v: 1 },
    { l: 'M', c: 2, v: 3 },
    { l: 'N', c: 6, v: 1 },
    { l: 'O', c: 8, v: 1 },
    { l: 'P', c: 2, v: 3 },
    { l: 'Q', c: 1, v: 10 },
    { l: 'R', c: 6, v: 1 },
    { l: 'S', c: 4, v: 1 },
    { l: 'T', c: 6, v: 1 },
    { l: 'U', c: 4, v: 1 },
    { l: 'V', c: 2, v: 4 },
    { l: 'W', c: 2, v: 4 },
    { l: 'X', c: 1, v: 8 },
    { l: 'Y', c: 2, v: 4 },
    { l: 'Z', c: 1, v: 10 },
    { l: ' ', c: 2, v: 0 },

  ];

  document.querySelectorAll('.tile').forEach(el => el.remove());

  for (const tileType of tileTypes) {
    for (let i = 0; i < tileType.c; i += 1) {
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
