// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // World
  worldRatio: getWorldRatio(),
  // TODO Other things
  turn: 1,
  players: [
    {
      name: 'Anne of Cleves'
    }, {
      name: 'William the Bald'
    },
  ],
  testHand: [],
  activeOverlay: null,
  currentPlayerIndex: Math.round(Math.random()) // 方法将随机使用 0 或 1 来确定谁先行动。
}
