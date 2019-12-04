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
      name: 'Anne of Cleves',
      // 游戏开始状态
      food: 10,
      health: 10,
      // 是否跳过下个回合
      skipTurn: false,
      // 跳过了上一回合
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: 'archers',
      dead: false,
    }, {
      name: 'William the Bald',
      // 游戏开始状态
      food: 10,
      health: 10,
      // 是否跳过下个回合
      skipTurn: false,
      // 跳过了上一回合
      skippedTurn: false,
      hand: [],
      lastPlayedCardId: 'catapult',
      dead: false,
    },
  ],
  testHand: [],
  activeOverlay: null,
  currentPlayerIndex: Math.round(Math.random()), // 方法将随机使用 0 或 1 来确定谁先行动。


  get currentPlayer() {
    return state.players[state.currentPlayerIndex]
  },

  get currentOpponentId() {
    return state.currentPlayerIndex === 0 ? 1 : 0
  },

  get currentOpponent() {
    console.log(state.players[state.currentOpponentId])
    return state.players[state.currentOpponentId]
  },
  drawPile: pile,
  discardPile: {},

  get currentHand() {
    return state.currentPlayer.hand
  },
  canPlay: false,
}
