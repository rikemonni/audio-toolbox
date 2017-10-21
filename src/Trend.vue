<template>
  <div class="trend">
    <template v-for="n in boundingClientRect.width">
      <sample :key="n" :sample="aggregateSamples[n]"></sample>
    </template>
  </div>
</template>

<script>

import Sample from "./Sample.vue";

function updateSamplesFromAudioIn(bufferSize, cb) {
  navigator.mediaDevices.getUserMedia({audio: true})
    .then(MeadiaStream => {
      var audioCtx = new AudioContext();
      var source = audioCtx.createMediaStreamSource(MeadiaStream);

      // Create a ScriptProcessorNode with a bufferSize of 4096 and a single input and output channel
      var scriptNode = audioCtx.createScriptProcessor(bufferSize, 1, 1);
      source.connect(scriptNode);
      // In order to get onaudioprocess firing scriptNode's output needs to be connected
      scriptNode.connect(audioCtx.destination);

      scriptNode.onaudioprocess = audioProcessingEvent => {
        var inputBuffer = audioProcessingEvent.inputBuffer;
        var channel = inputBuffer.getChannelData(0);
        cb(channel);
      }
    })
    .catch(e => {
      console.error("nevermind.. :smoke:", e);
    });
}


export default {
  name: 'trend',
  components: {
    "sample": Sample
  },
  data: function() {
    // boundingClientRect Type DOMRect
    return {
      bufferSize: 512,
      samplingFreq: 44100,
      startIndex: 0,
      rawSamples: [],
      boundingClientRect: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
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
    
    // We'd like to display each sample ->
    // this.samplingFreq / this.boundingClientRect.width > 60
    // if it is, use this.boundingClientRect.width as bufferWidth

    // Use the mic input for the trend data
    updateSamplesFromAudioIn(this.bufferSize, this.updateSamples);
  }
}

</script>

<style lang="scss">
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
