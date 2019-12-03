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
            <hand :cards="testHand" v-if="!activeOverlay" />
        </transition>
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