<template>
    <div class="scope">
      <canvas id="scope" width="1280" :height="height"></canvas>
      <grid-overlay></grid-overlay>
    </div>
</template>

<script>

import GridOverlay from "./GridOverlay.vue";

const BUFFER_LENGTH = 2048;
const dataArray = new Uint8Array(BUFFER_LENGTH);

export default {
  name: "scope",
  components: {
    "grid-overlay": GridOverlay
  },
  props: {
    gain: {
      Type: Number
    },
    yPos: {
      Type: Number
    }
  },
  data: function() {
    return {
      timespan: 1280,
      bufferLength: 2048,
      height: 660,
    };
  },
  methods: {
    drawCanvas: function() {
      const canvas = this.$el.querySelector("#scope")
      const canvasCtx = canvas.getContext("2d");

      this.analyser.getByteTimeDomainData(dataArray);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#42b983";

      canvasCtx.beginPath();

      canvasCtx.fillStyle = "#2c3e50";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the contents of the audio buffer in slices
      const sliceWidth = canvas.width / this.bufferLength;
      var x = 0;
      for (var i = 0; i < this.bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * (canvas.height / 2) + this.yPos;

        i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);

        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke(); // Finish the line to mid right

      requestAnimationFrame(this.drawCanvas);
    }
  },
  mounted: function() {
    const canvas = this.$el.querySelector("#scope");
    const canvasCtx = canvas.getContext("2d");

    canvasCtx.fillStyle = "#2c3e50";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    this.getMediaStremSourceAsync()
      .then(source => {
        console.log("Starting to draw scope to canvas.");
        this.analyser.getByteTimeDomainData(dataArray);
        this.drawCanvas();
      })
      .catch(e => {
        console.error("nevermind.. :smoke:", e);
      });
  }
};
</script>

<style lang="scss">
.scope {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
}
// needed ?
#canvas {
  position: relative;
  display: inline-block;
}

</style>
