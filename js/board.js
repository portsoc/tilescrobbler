export function makeHTMLGameBoard(boardEl) {
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
  for (let i = 0; i < quarterBoard.length * 2 - 1; i += 1) {
    for (let j = 0; j < quarterBoard[0].length * 2 - 1; j += 1) {
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
