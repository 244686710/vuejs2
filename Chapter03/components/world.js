Vue.component('castle', {
    template: `<div class="castle" :class="'player-' + index">
        <img class="building" :src="'svg/castle' + index + '.svg'"  />
        <img class="ground" :src="'svg/ground' + index + '.svg'" />
        <castle-banners :player="player" />
        <div class="clouds">
          <cloud v-for="index in 10" :type="(index-1) % 5 + 1" />
        </div>
    </div>`,
    props: [
        'player', 'index'
    ],
    created() {
        console.log(this.player)
    },
})

// 城堡旗子
Vue.component('castle-banners', {
    template: `<div class="banners">
        <!-- 食物 -->
        <img  class="food-icon" src="svg/food-icon.svg" />
        <bubble type="food" :value="player.food" :ratio="foodRatio" />
        <banner-bar class="food-bar" color="#288339" :ratio="foodRatio"/>

        <!-- 这里是生命值 -->
        <img class="health-icon" src="svg/health-icon.svg" />
        <bubble type="health" :value="player.health" :ratio="healthRatio" />
        <banner-bar class="health-bar" color="#9b2e24" :ratio="healthRatio"/>
    </div>`,
    props: ['player'],
    computed: {
        foodRatio() {
            return this.player.food / maxFood
        },
        healthRatio() {
            return this.player.health / maxHealth
        }
    },
    created() {
        console.log(this.player)
    }
})

Vue.component('bubble', {
    template: `<div class="stat-bubble" :class="type + '-bubble'" :style="bubbleStyle">
      <img :src="'svg/' + type + '-bubble.svg'" />
      <div class="counter">{{ value }}</div>
    </div>`,
    props: ['type', 'value', 'ratio'],
    computed: {
        bubbleStyle() {
            return {
                top: (this.ratio * 220 + 40) * state.worldRatio + 'px',
            }
        },
    },
})

Vue.component('banner-bar', {
    template: '#banner',
    props: ['color', 'ratio'],
    computed: {
        targetHeight() {
            return 220 * this.ratio + 40
        },
    },
    data() {
        return {
            height: 0,
        }
    },
    watch: {
        targetHeight(newValue, oldValue) {
            const vm = this
            new TWEEN.Tween({
                    value: oldValue
                })
                .easing(TWEEN.Easing.Cubic.InOut)
                .to({
                    value: newValue
                }, 500)
                .onUpdate(function () {
                    vm.height = this.value.toFixed(0)
                })
                .start()
        },
    },
    created() {
        this.height = this.targetHeight
    },
})

const cloudAnimationDurations = {
  min: 10000, // 10s
  max: 50000
}

Vue.component('cloud', {
  template: `<div class="cloud" :class="'cloud=' + type" :style="style">
    <img :src="'svg/cloud' + type + '.svg'" @load="initPosition"/>
  </div>`,
  props: ['type'],
  data() {
    return {
      style: {
        transform: 'none',
        zIndex: 0,
      }
    }
  },
  methods: {
    setPosition(left, top) {
      //使用transform可以获得更好的性能
      this.style.transform = `translate(${left}px, ${top}px)`
    },
    initPosition() {
      //元素宽度
      const width = this.$el.clientWidth
      this.setPosition(-width, 0)
    },
    startAnimation(delay =0) {
      const vm = this;
      // 元素宽度
      const width = this.$el.clientWidth;

      // 随机动画持续时间
      const { min, max } = cloudAnimationDurations;
      const animationDuration = Math.random() * (max-min) + min

      // 将速度快的云朵放到最前面
      this.style.zIndex = Math.random(max - animationDuration);
      //动画在这里
      // 随机位置
      const top = Math.random() * (window.innerHeight * 0.3)

      new TWEEN.Tween({ value: -width })
        .to({ value: window.innerHeight }, animationDuration).delay(delay)
        .onUpdate(function() {
          vm.setPosition(this.value, top)
        })
        .onComplete(() => {
          //随机延迟
          this.startAnimation(Math.random() * 10000)
        })
        .start()
    }
  },
  mounted() {
    // 以负值延迟开始动画
    // 所以动画将从中途开始
    this.startAnimation(-Math.random()) * cloudAnimationDurations.min
  },
})
