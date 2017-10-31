<template>
  <div class="container">
    <canvas class="spectrogram" width="1280" height="660px"></canvas>
  </div>
</template>

<script>

const Spectrogram = require("spectrogram");
const chroma = require("chroma-js");

export default {
  name: "spectrogram",
  data: function() {
    return {
      width: 0,
    };
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
    const audioContext = new AudioContext();

    this.width = this.$el.getBoundingClientRect().width;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const input = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
      
        analyser.smoothingTimeConstant = 0;
        analyser.fftSize = 2048;
      
        input.connect(analyser);
      
        spectro.connectSource(analyser, audioContext);
        spectro.start();
      })
      .catch(error => {
        console.log("Error", error);
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
