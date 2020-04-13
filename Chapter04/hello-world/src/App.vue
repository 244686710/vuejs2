<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import Test from './Test'
export default {
  // components: { Test },
  data () {
    return {
      message: 'Hello world'
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  color: grey;
}
</style>
