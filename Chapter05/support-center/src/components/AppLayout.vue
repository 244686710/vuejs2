<template>
  <div class="app-layout">
    <header class="header">
      <div><img class="img" src="../assets/logo.svg" alt="" /></div>
      <div>My shirt shop</div>
    </header>
    <nav-menu></nav-menu>
    <!-- 菜单将放在这里 -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
import NavMenu from './NavMenu'
export default {
  components: {
    NavMenu
  }
}
</script>
<style lang="stylus">
@import '../style/main';
</style>
<style lang="stylus" scoped>
.header{
  .img {
    width 64px
    height 64px
  }
}
</style>
