<script>
import SnakeGame from "@components/SnakeGame";
import Webcam from "@components/Webcam";


export default {
  components: { SnakeGame, Webcam },

}
</script>

<template>
  <v-container
      class="fill-height"
      fluid
  >
    <v-layout
        row
        wrap
        justify-center
        align-center
    >
      <v-flex
          shrink
      >
        <webcam></webcam>
      </v-flex>
      <v-flex
          shrink
      >
       <snake-game></snake-game>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<style lang="scss" module>

</style>