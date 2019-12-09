export default {
  namespaced: true, // 带命名空间的模块， namespaced 选项告诉vuex在该模块的所有getter, mutation 和 action 前添加maps命名空间。同时，还会在这个模块内的commit和dispatch
  state() {
    return {
      center: {
        lat: 48.8538302,
        lng: 2.2982161
      },
      zomm: 15
    };
  }
};
