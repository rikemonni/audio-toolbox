<template>
    <div class="spectrum">
      <canvas id="spectrum" width="1280" :height="height"></canvas>
      <grid-overlay></grid-overlay>
    </div>
</template>

<script>

import GridOverlay from "./GridOverlay.vue";

const BUFFER_LENGTH = 1024;
const dataArray = new Uint8Array(BUFFER_LENGTH);

export default {
  name: "spectrum",
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
      timespan: BUFFER_LENGTH / 2,
      bufferLength: BUFFER_LENGTH,
      height: 620,
    };
  },
  methods: {
    drawCanvas: function() {
      const canvas = this.$el.querySelector("#spectrum")
      const canvasCtx = canvas.getContext("2d");

      this.analyser.getByteFrequencyData(dataArray);
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      canvasCtx.fillStyle = "#2c3e50";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / BUFFER_LENGTH);
      var barHeight;
      var x = 0;
      canvasCtx.fillStyle = '#42b984';
      for(var i = 0; i < BUFFER_LENGTH; i++) {
        barHeight = dataArray[i] * 4;
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
        x += barWidth;
      }
      requestAnimationFrame(this.drawCanvas);
    }
  },
  mounted: function() {
    const canvas = this.$el.querySelector("#spectrum");
    const canvasCtx = canvas.getContext("2d");

    canvasCtx.fillStyle = "#2c3e50";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    this.getMediaStremSourceAsync()
      .then(source => {
        console.log("Starting to draw spectrum to canvas.");
        this.analyser.getByteTimeDomainData(dataArray);
        this.drawCanvas();
      })
      .catch(e => {
        console.error("nevermind.. :smoke:", e);
      });
  }
};
</script>

<style lang="scss" scoped>
.spectrum {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
}

#spectrum {
  position: relative;
  display: inline-block;
}

</style>
