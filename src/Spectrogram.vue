<template>
  <div class="container">
    <canvas class="spectrogram" width="1280" height="660px"></canvas>
    <grid-overlay></grid-overlay>
  </div>
</template>

<script>

const Spectrogram = require("spectrogram");
const chroma = require("chroma-js");

import GridOverlay from "./GridOverlay.vue";

export default {
  name: "spectrogram",
  components: {
    "grid-overlay": GridOverlay
  },
  mounted: function() {
    const spectro = Spectrogram(this.$el.querySelector("canvas"), {
      audio: {
        enable: false
      },
      colors: function(steps) {
        const baseColors = [
          [44,62,80,1],  // bg
          [0,255,255,1], // green
          [89, 166, 102, 1],
          [255,255,0,1],
          [ 255,0,0,1]
        ];
        const positions = [0, 0.15, 0.30, 0.50, 0.75];
    
        var scale = chroma.scale(baseColors, positions)
          .domain([0, steps]);
    
        var colors = [];
    
        for (var i = 0; i < steps; ++i) {
          var color = scale(i);
          colors.push(color.hex());
        }
    
        return colors;
      }
    });

    this.getMediaStremSourceAsync()
      .then(input => {
        const analyser = this.audioContext.createAnalyser();
      
        analyser.smoothingTimeConstant = 0;
        analyser.fftSize = 2048;
        // to do, handle disconnects on unmount
        input.connect(analyser);
      
        spectro.connectSource(analyser, this.audioContext);
        spectro.start();
      });
  }
}

</script>

<style lang="scss">

.container {
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  position: relative;
}

.spectrogram {
  top: 0;
  left: 0;
  position: absolute;
}

</style>
