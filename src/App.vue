<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style lang="scss">
body {
   background: linear-gradient(to right, #314755, #26a0da); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
