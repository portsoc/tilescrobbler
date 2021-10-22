# tilescrobbler

This is our quick take on 2020/2021 coursework assignment for first-year Application Programming students – we the lecturers want to check how far we get with it in a day.

## Done:
  - Build board as grid (#board)
  - Apply correct colours to board
  - Design tile (letters and scoring)
  - Research how many tiles there should be and how much each tile scores.
  - Encode tiles in data structure - all in the DOM.
  - Create bag of tiles (how many of each letter) (#bag)
  - Create tray for player tiles (#rack)
  - putting tiles on board

## Debugging challenge:

In drag.js, the function `containsTile()` is a quick check that an element contains a tile.
It's intended to disallow drops on board squares that already contain a tile.

However, the program currently doesn't work – it still allows drops over existing tiles. Your challenge is to debug it.
