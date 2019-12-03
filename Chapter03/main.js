new Vue({
    name: 'game',
    el: "#app",
    data: state,
    computed: {
        testCard() {
            return cards.archers
        }
    },
    template: `<div id="app">
        <top-bar 
            :turn="turn"
            :current-player-index="currentPlayerIndex"
            :players="players"
        />
        <!--
            <card :def="testCard" @play="handlePlay"/>
        -->
        <transition name="hand">
            <hand :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard" />
        </transition>

        <overlay v-if="activeOverlay">
            <overlay-content-player-turn 
                v-if="activeOverlay === 'player-turn'" 
                :player="currentPlayer" />
            <overlay-content-last-play 
                v-else-if="activeOverlay === 'last-play'"
                :opponent="currentOpponent" />
            <overlay-content-game-over
                v-if="activeOverlay === 'game-over'"
                :players="players" />
        </overlay>
    </div>`,
    methods: {
        handlePlay() {
            console.log("you play a card!")
        },
        createTestHand() {
            const cards = [];
            const ids = Object.keys(cards);

            // 抽取五张卡片
            for(let i = 0; i < 5; i++) {
                cards.push(this.testDrawCard())
            }
            return cards
        },
        testDrawCard() {
            const ids = Object.keys(cards);
            const randomId = ids[Math.floor(Math.random() * ids.length )]

            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId]
            }
        },
        testPlayCard(card) {
            // 将卡牌从玩家手中移除
            const index = this.testHand.indexOf(card);
            this.testHand.splice(index, 1)
        }
    },
    created() {
        this.testHand = this.createTestHand()
    },
})

// 窗口大小变换的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})