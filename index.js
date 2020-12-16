function makeHTMLGameBoard() {
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
      elements.push(el);
    }
  }

  const boardEl = document.querySelector('#board');
  boardEl.textContent = '';
  boardEl.append(...elements);
}

function init() {
  makeHTMLGameBoard();
}

window.addEventListener('load', init);







// GenerateBag this many of each type
// A-9, B-2, C-2, D-4, E-12, F-2, G-3, H-2, I-9, J-1, K-1, L-4, M-2, N-6, O-8, P-2, Q-1, R-6, S-4, T-6, U-4, V-2, W-2, X-1, Y-2, Z-1

/*

2 blank tiles (scoring 0 points)
1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
2 points: D ×4, G ×3
3 points: B ×2, C ×2, M ×2, P ×2
4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
5 points: K ×1
8 points: J ×1, X ×1
10 points: Q ×1, Z ×1

*/