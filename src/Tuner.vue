<template>
    <div class="tuner-page">
        <div class="tuner" title="turn on, tune in, drop out">
          <div class="description">Note</div>
          <div class="value" :class="dominantFreq === '--' ? 'value--undefined' : ''"> {{ closestNote }}</div>
          <div class="description">Dominant Freq</div>
          <div class="value" :class="dominantFreq === '--' ? 'value--undefined' : ''">{{ dominantFreq }}</div>
          <offset-indicator class="offset-indicator" :target="440" :value="430" />
        </div>
    </div>
</template>

<script>

import OffSetIndicator from "./OffSetIndicator.vue";
import { mapState, mapGetters } from "vuex";

const BUFFER_LENGTH = 2048;
const dataArray = new Float32Array(BUFFER_LENGTH);

export default {
  name: "tuner",
  components: {
    "offset-indicator": OffSetIndicator,
  },
  computed: {
    ...mapState({
      dominantFreq: state => state.dominantFreq,
      closestNote: state => state.closestNote,
    }),
    ...mapGetters([
      'closestNote',
      'lowerNoteFreq',
      'upperNoteFreq',
    ])
  },
  methods: {
    updateTuner: function() {
      this.analyser.getFloatTimeDomainData(dataArray);
      var dominantFreq = this.getDominantFreq(dataArray);
      if (this.audioContext.sampleRate !== dominantFreq) {
        // TODO: curve fitting, smoothing
        dominantFreq = Math.round(dominantFreq * 100) / 100;
        this.$store.commit('updateDominantFreq', dominantFreq)
      } else {
        // the sound of silence
        // this.dominantFreq = "--";
      }
      requestAnimationFrame(this.updateTuner);
    },
    // Use autocorrelation for getting the dominant frequency
    getDominantFreq: function(data) {
      let halfBufferLength = Math.floor(data.length * 0.5);
      let diff = 0;
      let smallestDiff = Number.POSITIVE_INFINITY;
      let smallestDiffOffset = 0;
      
      // no need to start looking at the 1 index (20 Hz ->)
      for (let o = 1; o < halfBufferLength; ++o) {
        diff = 0;
        for (let i = 0; i < halfBufferLength; ++i) {
          diff += Math.abs(data[i] - data[i + o]);
        }
        // avg diff per sample
        diff /= halfBufferLength;
        if (diff < smallestDiff) {
          smallestDiff = diff;
          smallestDiffOffset = o;
        }
      }
      // Now we know which offset yielded the smallest
      // convert it to a frequency.
      return this.audioContext.sampleRate / smallestDiffOffset;
    }
  },
  mounted: function() {
    this.getMediaStremSourceAsync()
      .then(source => {
        this.updateTuner();
      })
      .catch(e => {
        console.error("nevermind.. :smoke:", e);
      });
  }
};
</script>

<style lang="scss" scoped>

.tuner-page {
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
}
.tuner {
  font-size: 2em;
  position: relative;
  margin-top: 3em;

  .description {
    font-size: 0.5em;
    font-weight: bold;
    text-transform: uppercase;
  }

  .value {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    left: 0;
    transition: opacity 0.1s ease-in-out;
  }
}

.value--undefined {
  opacity: 0.1;
}

.offset-indicator {
  margin-top: 2em;
}

</style>
