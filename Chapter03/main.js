new Vue({
  name: 'game',
  el: "#app",
  data: state,
  computed: {
    testCard() {
      return cards.archers
    },
    cssClass() {
      return {
        'can-play': this.canPlay
      }
    }
  },
  template: `<div id="app" :class="cssClass">
        <top-bar
            :turn="turn"
            :current-player-index="currentPlayerIndex"
            :players="players"
        />
        <div class="world">
            <castle v-for="(player, index) in players" :player="player" :index="index" />
            <div class="land"></div>
        </div>
        <!--
            <card :def="testCard" @play="handlePlay"/>
        -->
        <transition name="hand">
            <hand :cards="currentHand" v-if="!activeOverlay" @card-play="handlePlayCard" />
        </transition>

        <transition name="fade">
            <div class="overlay-background" v-if="activeOverlay"></div>
        </transition>
        <transition name="room">
            <overlay v-if="activeOverlay" :key="activeOverlay">
                <!--
                    <overlay-content-player-turn
                        v-if="activeOverlay === 'player-turn'"
                        :player="currentPlayer" />
                    <overlay-content-last-play
                        v-else-if="activeOverlay === 'last-play'"
                        :opponent="currentOpponent" />
                    <overlay-content-game-over
                        v-if="activeOverlay === 'game-over'"
                        :players="players" />
                -->
                <!-- 用component组件来判断 -->
                <component :is="'overlay-content-' + activeOverlay"
                    :player="currentPlayer"
                    :opponent="currentOpponent"
                    :players="players"
                ></component>
            </overlay>
        </transition>
    </div>`,
  methods: {
    handlePlay() {
      console.log("you play a card!")
    },
    testDrawCard() {
      const ids = Object.keys(cards);
      const randomId = ids[Math.floor(Math.random() * ids.length)]

      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId]
      }
    },
    handlePlayCard(card) {
      // 将卡牌从玩家手中移除
      playCard(card)
    },

  },

  mounted() {
    beginGame()
  },
})

// 窗口大小变换的处理
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})

// Tween.js
requestAnimationFrame(animate);

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

function beginGame() {
  state.players.forEach(drawInitialHand)
}

function playCard(card) {
  if (state.canPlay) {
    state.canPlay = false;
    currentPlayingCard = card

    // 将卡片从玩家手中移除
    const index = state.currentPlayer.hand.indexOf(card)
    state.currentPlayer.hand.splice(index, 1)

    // 将卡牌放到弃牌堆中
    addCardToPile(state.discardPile, card.id)
  }
}
