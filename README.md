# tilescrobbler

This is our quick take on 2020/2021 coursework assignment for first-year Application Programming students – we the lecturers want to check how far we get with it in a day.

Things to do
  ???
  - exchange a tile – needs some way of selecting some tiles
  - pass
  - resign
  - rearranging tiles in rack
  - putting letter on blank tile (while in rack)
    - add input on the tile
    - onInput set dataset.letter
    - when committed (on board and not staged) input disappears and we show dataset.letter
  - check if staged move is valid
    - all letters in a single line
    - all blanks are filled in
    - all words valid
    - if no tiles on board but staged tiles, letters must cover star
  - commit tiles to the game (2 stage to stop whoops)
  - remove staged (uncommited tiles from the board)
  - find dictionary (https://github.com/portsoc/appprog-dict)
  - detect if staged tiles form a valid word (or words)
  - choose how much game state server should have
  - add server with game state (stop client allocating tiles)
  - animate recall by calculating curent xypos, moving tile back to the rack, translating back to its start position adn allowing transform to animate the return.

Done:
  - Build board as grid (#board)
  - Apply correct colours to board
  - Design tile (letters and scoring)
  - Research how many tiles there should be and how much each tile scores.
  - Encode tiles in data structure - all in the DOM.
  - Create bag of tiles (how many of each letter) (#bag)
  - Create tray for player tiles (#rack)
  - shuffling the rack randomly
  - scoring staged tile words
  - putting tiles on board
    - touch drag and drop?

?? game api so the UI can control the game
  - move letter from bar and place on board
  - return letter from board to bar
