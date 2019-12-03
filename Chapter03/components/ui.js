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
        console.log(this.players)
    },
});

Vue.component('card', {
    props: ['def'],
    template: `
        <div class="card" :class="'type-' + def.type" @click="paly" >
            <div class="title">{{ def.title }}</div> 
            <img class="separator" src="svg/card-separator.svg" />
            <div class="desription">
                <div class="note" v-html="def.note"></div>
            </div>  
        </div>
    `,
    methods: {
        paly() {
            this.$emit('play')
        }
    },
})

Vue.component('hand', {
    props: ['cards'],
    template: `<div class="hand">
        <div class="wrapper">
            <template v-for="card of cards">
                <card  :def="card.def" />
            </template>
        </div>
    </div>`,
    created() {
        
    },
})