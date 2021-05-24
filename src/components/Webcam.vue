<template>
  <v-card class="mx-auto">
    <v-container>
      <v-layout row
                wrap
                justify-center
                align-center>
        <v-flex shrink>
          <v-list>
            <v-list-item>
              <canvas
                  class="align-end"
                  ref="output"
                  width="320"
                  height="240"
              >
              </canvas>
              <video
                  ref="video"
                  playsinline
                  muted
                  hidden
              ></video>
            </v-list-item>
            <v-list-item>
              <v-row align="center"
              justify="space-around">
                <v-btn :disabled="!isThumb">1</v-btn>
                <v-btn :disabled="!isIndexFinger">2</v-btn>
                <v-btn :disabled="!isMiddleFinger">3</v-btn>
                <v-btn :disabled="!isRingFinger">4</v-btn>
                <v-btn :disabled="!isPinky">5</v-btn>
              </v-row>

            </v-list-item>
            <v-list-item>
              <v-row align="center"
                     justify="space-around">
                <v-btn :disabled="!(curr==='찌')"> ✌ </v-btn>
                <v-btn :disabled="!(curr==='묵')"> 👊 </v-btn>
                <v-btn :disabled="!(curr==='빠')"> ✋ </v-btn>
                <v-btn :disabled="!(curr==='최고')"> 👍 </v-btn>
              </v-row>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import {snake} from "@game/snake.js"
import {main} from '@/tf/hand.js'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      isThumb: false,
      isIndexFinger: false,
      isMiddleFinger: false,
      isRingFinger: false,
      isPinky: false,
      curr: "ready"
    }
  },
  methods: {
    poseCallback: function(result) {
      var anno = result[0].annotations;
      var thumb = anno.thumb;
      var indexFinger = anno.indexFinger;
      var middleFinger = anno.middleFinger;
      var ringFinger = anno.ringFinger;
      var pinky = anno.pinky;
      var palmBase = anno.palmBase;

      this.isThumb = this.isStreched(thumb, palmBase);
      this.isIndexFinger = this.isStreched(indexFinger, palmBase);
      this.isMiddleFinger = this.isStreched(middleFinger, palmBase);
      this.isRingFinger = this.isStreched(ringFinger, palmBase);
      this.isPinky = this.isStreched(pinky, palmBase);

      if (this.isThumb && this.isIndexFinger && this.isMiddleFinger
          && this.isRingFinger && this.isPinky) {
        this.curr= "빠"
        snake.faceDown();
      }
      else if (!this.isThumb && this.isIndexFinger && this.isMiddleFinger
          && !this.isRingFinger && !this.isPinky) {
        this.curr= "찌"
        snake.faceUp();
      }
      else if (!this.isThumb && !this.isIndexFinger && !this.isMiddleFinger
          && !this.isRingFinger && !this.isPinky) {
        this.curr = "묵"
        snake.faceLeft();
      }
      else if (this.isThumb && !this.isIndexFinger && !this.isMiddleFinger
          && !this.isRingFinger && !this.isPinky) {
        this.curr = "최고"
        snake.faceRight();
      }
      else {
        this.curr = "Nothing"
      }
    },
    getDistance: function (x1, y1, x2, y2) {
      return (x1 - x2) ** 2 + (y1 - y2) ** 2;
    },
    isStreched: function(finger, palmBase) {
      // 손 끝이랑 손목간의 거리
      var a = this.getDistance(palmBase[0][0], palmBase[0][1], finger[3][0], finger[3][1]);
      //손가락 중간이랑 손목간의 거리
      var b = this.getDistance(palmBase[0][0], palmBase[0][1], finger[2][0], finger[2][1]);
      return a > b;
    }
  },
  mounted() {
    var canvas = this.$refs.output;
    var video = this.$refs.video;

    // 웹캠 사용권한이 승인되는 경우 스트리밍 영상을 player의 재생대상으로 지정
    var handleSuccess = function (stream) {
      video.srcObject = stream;
      video.play();
    };
    navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);

    ///////////////////////////////////////////////////////////////////////
    /* Video to Canvas */
    const width = canvas.width;
    const height = canvas.height;

    var context = canvas.getContext('2d');
    video.addEventListener('play', function(){
      draw(this, context, width, height);
    },false);

    function draw(v,c,w,h) {
      if(v.paused || v.ended) return false;
      c.drawImage(v,0,0,w,h);
      setTimeout(draw,20,v,c,w,h);
    }

    main(canvas, this.poseCallback);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
