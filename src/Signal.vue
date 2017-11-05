<template>
  <div class="content">
    <div class="trend">
      <template v-for="n in boundingClientRect.width">
        <sample :key="n" :sample="aggregateSamples[n]"></sample>
      </template>
    </div>
    <grid-overlay></grid-overlay>
  </div>
</template>

<script>

import Sample from "./Sample.vue";
import GridOverlay from "./GridOverlay.vue";

export default {
  name: 'trend',
  components: {
    "sample": Sample,
    "grid-overlay": GridOverlay
  },
  data: function() {
    return {
      bufferSize: 2048,
      samplingFreq: 44100,
      startIndex: 0,
      rawSamples: [],
      boundingClientRect: {
        height: 0,
        width: 0,
      }
    }
  },
  methods: {
    updateSamples: function(sampleData) {
      // raw samples contains buffer full of samples
      this.rawSamples = sampleData;
    }
  },
  computed: {
    aggregateSamples: function() {
      // TODO, change it so that 
      const samplesPerPixel = this.rawSamples.length / this.boundingClientRect.width;
      const arr = new Array(this.boundingClientRect.width);
      for (var i = 0; i < this.boundingClientRect.width; ++i) {
        arr[i] = this.rawSamples.slice(i * samplesPerPixel, (i + 1) * samplesPerPixel)
          .reduce((acc, cur) => acc + cur, 0) / samplesPerPixel;
      }
      return arr;
    }
  },
  mounted: function() {
    // Get element's width and height
    // Todo: update on resize
    this.boundingClientRect = this.$el.getBoundingClientRect();
    window.addEventListener("resize", e => {
      this.boundingClientRect = this.$el.getBoundingClientRect();    
    });
    // We'd like to display each sample ->
    // this.samplingFreq / this.boundingClientRect.width > 60
    // if true, use this.boundingClientRect.width as bufferWidth

    this.getMediaStremSourceAsync()
      .then(source => {
        // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
        var scriptNode = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1);
        source.connect(scriptNode);
        // In order to get onaudioprocess firing scriptNode's output needs to be connected
        scriptNode.connect(this.audioContext.destination);

        scriptNode.onaudioprocess = audioProcessingEvent => {
          var inputBuffer = audioProcessingEvent.inputBuffer;
          var channel = inputBuffer.getChannelData(0);
          this.updateSamples(channel);
        }
      })
      .catch(e => {
        console.error("nevermind.. :smoke:", e);
      });

  }
}

</script>

<style lang="scss">

.content {
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.trend {
  width: 100%;
  height: 330px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
