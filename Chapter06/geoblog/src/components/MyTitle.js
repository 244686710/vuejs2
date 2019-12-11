import Vue from "vue";
Vue.component("my-title", {
  props: ["level"],
  render(h) {
    return h(
      // 标签页
      `h${this.level}`,
      {
        // 和v-bind:class一样的api
        class: {
          "important-title": this.level <= 3
        },
        // 和v-bind:style一样的api
        style: {
          color: "red",
          fontSize: "18px"
        },
        // 普通html属性
        attrs: {
          id: "foo"
        },
        props: {
          myProp: "bar"
        },
        // 事件处理函数嵌套在"on" 下面
        on: {
          click: this.clickHandler
        },
        // 仅组件可用，用来监听原生事件
        nativeOn: {}
      },
      // 默认插槽内容
      this.$slots.default
    );
  },
  methods: {
    clickHandler(event) {
      console.log("You clicked", event);
    }
  }
});
