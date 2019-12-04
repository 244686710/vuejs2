Vue.component('top-bar', {
    props: ['players', 'currentPlayerIndex', 'turn'],
    template: `<div class="top-bar" :class="'player-' + currentPlayerIndex ">
        <div class="player p0">{{ players[0].name }}</div> 
        <div class="turn-counter">
            <img class="arrow" src="svg/turn.svg"> 
            <div class="turn">
                Turn{{turn}}
            </div>
        </div> 
        <div class="player p1">{{ players[1].name }}</div> 
    </div>`,
    created() {
        // console.log(this.players)
    },
});

Vue.component('card', {
    props: ['def'],
    template: `
        <div class="card" :class="'type-' + def.type" @click="play" >
            <div class="title">{{ def.title }}</div> 
            <img class="separator" src="svg/card-separator.svg" />
            <div class="desription">
                <div class="note" v-html="def.note"></div>
            </div>  
        </div>
    `,
    methods: {
        play() {
            this.$emit('play')
        }
    },
})

Vue.component('hand', {
    props: ['cards'],
    template: `<div class="hand">
        <div class="wrapper">
        <transition-group name="card" tag="div" class="cards">
            <template v-for="card of cards">

            <card  :def="card.def" @play="handlePlay(card)" :key="card.uid" />
            </template>
        </transition-group>
        </div>
    </div>`,
    methods: {
        handlePlay(card) {
            this.$emit('card-play', card)
        }
    }
})

Vue.component('overlay', {
    template: `<div class="overlay" @click="handleClick">
        <div class="content">
            <!-- 这里是插槽 -->
            <slot></slot>
        </div> 
    </div>`,
    methods: {
        handleClick() {
            this.$emit("close")
        }
    }
})
// palyer-turn 浮层
Vue.component('overlay-content-player-turn', {
    template: `<div>
            <div class="big" v-if="player.skipTurn">{{palyer.name}},
            <br>your turn is skipped!</div>
            <div class="big" v-else>{{player.name}},<br>your turn has come!</div>
            <div>Tap to continue</div>
        </div>`,
    props: ['player']
})

// last-play 浮层
Vue.component('overlay-content-last-play', {
    template: `<div>
        <div v-if="opponent.skippedTurn">{{opponent.name}} turn was skipped!</div>
        <template v-else>
            <div>{{opponent.name}} just played:</div>
            <card :def="lastPlayedCard" />
        </template>
    </div>`,
    props: ['opponent'],
    computed: {
        lastPlayedCard() {
            return getLastPlayedCard(this.opponent)
        }
    },
})

function getLastPlayedCard(player) {
    console.log('card', cards)
    return cards[player.lastPlayedCardId]
}

// gave-over 浮层
Vue.component('player-result', {
    template: `<div class="player-result" :class="result">
        <span class="name">{{player.name}}</span>
        <span class="result">{{ result }}</span>    
    </div>`,
    props: ['player'],
    computed: {
        result() {
            return this.player.dead ? 'defeated' : 'victorious'
        }
    },

})
Vue.component('overlay-content-game-over', {
    template: `<div>
        <div class="big">Game Over</div>
        <player-result v-for="(player, index) in players" :key="index" :player="player" />
    </div>`,
    props: ['players']
})