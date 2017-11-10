<template>
    <div class="spectrum">
      <canvas id="spectrum" width="1280" :height="height"></canvas>
      <grid-overlay></grid-overlay>
    </div>
</template>

<script>

import GridOverlay from "./GridOverlay.vue";

const BUFFER_LENGTH = 2048;
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
      timespan: 1280,
      bufferLength: 2048,
      height: 660,
    };
  },
  methods: {
    drawCanvas: function() {
      const canvas = this.$el.querySelector("#spectrum")
      const canvasCtx = canvas.getContext("2d");

      this.analyser.getByteTimeDomainData(dataArray);
      canvasCtx.lineWidth = 2;
      // canvasCtx.strokeStyle = "#42b983";

      canvasCtx.beginPath();

      // canvasCtx.fillStyle = "#42b983";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      var barWidth = (canvas.width / BUFFER_LENGTH) * 2.5;
      var barHeight;
      var x = 0;
      for(var i = 0; i < BUFFER_LENGTH; i++) {
        barHeight = dataArray[i]/2;
        console.log(barHeight);
        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x, canvas.height - barHeight/2, barWidth, barHeight);

        x += barWidth + 1;
      }
      // Draw the contents of the audio buffer in slices
      // const sliceWidth = canvas.width / this.bufferLength;
      // var x = 0;
      // for (var i = 0; i < this.bufferLength; i++) {
      //   var v = this.gain * dataArray[i] / 128.0;
      //   var y = v * (canvas.height / 2) + this.yPos;

      //   i === 0 ? canvasCtx.moveTo(x, y) : canvasCtx.lineTo(x, y);

      //   x += sliceWidth;
      // }
      // canvasCtx.lineTo(canvas.width, canvas.height / 2);

      // canvasCtx.stroke(); // Finish the line to mid right

      requestAnimationFrame(this.drawCanvas);
    }
  },
  mounted: function() {
    const canvas = this.$el.querySelector("#spectrum");
    const canvasCtx = canvas.getContext("2d");

    // canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

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

<style lang="scss">
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
