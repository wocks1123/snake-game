<template>
  <v-card>
    <div id="game"></div>
  </v-card>
</template>

<script>
import {launch} from "@game/snake.js";


export default {
  name: "SnakeGame",
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    launch("game");
  }
}
</script>

<style scoped>

</style>