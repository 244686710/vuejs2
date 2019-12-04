<template>
  <div class="app-layout">
    <header class="header">
      <div><img class="img" src="../assets/logo.svg" alt="" /></div>
      <div>My shirt shop</div>
    </header>

    <!-- 菜单将放在这里 -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus">
// @import url('~@/style.main.styl');
</style>
<style lang="stylus" scoped>
.header{
  .img {
    width 64px
    height 64px
  }
}
</style>
