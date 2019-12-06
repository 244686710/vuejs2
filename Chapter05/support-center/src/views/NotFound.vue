<template>
  <main class="not-found">
    <h1>This pages can't be found</h1>
    <p class="more-info">
      Sorry, but wen can't find the page you're looking for. <br>
      It might have been moved or deleted. <br>
      check your spelling or click below to return to the homepage.
    </p>
    <div class="actions">
      <router-link tag="button" :to="{ name: 'home' }">Return to home</router-link>
    </div>
  </main>
</template>
<style lang="stylus" scoped>
.more-info {
  text-align center
}
</style>
