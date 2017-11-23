<template>
  <div class="container">
    <display
      :freqVal="freq"
      :amplitudeVal="amplitude"
      v-on:changeFreq="changeFreq"
      v-on:changeAmpl="changeAmpl">
    </display>
    <div class="btn-container">
      <btn
        :text="sineText"
        :toggled="sineToggled"
        v-on:toggle="toggleWaveform('sine')">
      </btn>
      <btn 
        :text="squareText"
        :toggled="squareToggled"
        v-on:toggle="toggleWaveform('square')">
      </btn>
      <btn 
        :text="sawText"
        :toggled="sawToggled"
        v-on:toggle="toggleWaveform('saw')">
      </btn>
      <btn 
        :text="triangleText"
        :toggled="triangleToggled"
        v-on:toggle="toggleWaveform('triangle')">
      </btn>
    </div>
    <div class="btn-container">
      <btn 
        text="On"
        :toggled="soundOn"
        v-on:toggle="toggleSound(true)">
      </btn>
      <btn 
        text="Off"
        :toggled="!soundOn"
        v-on:toggle="toggleSound(false)">
      </btn>
    </div>
  </div>
</template>

<script>

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
var initialFreq = 440;
oscillator.type = 'sine';
oscillator.frequency.value = initialFreq;
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.start();
gainNode.gain.value = 0;
// const speedOfSound = 345;

import Display from './components/Display.vue'
import Btn from './components/Btn.vue';
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'signal-generator',
  components: {
    Display, Btn
  },
  computed: {
    ...mapState({
      sineToggled: state => state.waveform === "sine",
      squareToggled: state => state.waveform === "square",
      sawToggled: state => state.waveform === "saw",
      triangleToggled: state => state.waveform === "triangle",
      freq: state => state.freq,
      amplitude: state => state.amplitude,
    }),
    ...mapGetters([
      'soundOn'
    ])
  },
  data: function() {
    return {
      sineText: "Sine",
      squareText: "Square",
      sawText: "Saw",
      triangleText: "Triangle",
      soundText: "Off",
      currentWaveform: "sine"
    };
  },
  methods: {
    toggleWaveform: function(waveform) {
      this.$store.commit('changeWaveform', waveform);
      oscillator.type = this.$store.state.waveform;
    },
    changeFreq: function(freq) {
      this.$store.commit('changeFreq', freq);
      oscillator.frequency.value = this.$store.state.freq;
    },
    changeAmpl: function(ampl) {
      this.$store.commit('changeAmplitude', ampl);
      gainNode.gain.value = this.$store.state.amplitude;
    },
    toggleSound: function(state) {
      if (this.$store.getters.soundOn && state) {
        return;
      }
      this.$store.commit("changeAmplitude", state ? 1 : 0);
      this.changeAmpl(this.$store.state.amplitude);
    }
  }
}
</script>

<style scoped>

.container {
  margin: auto;
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.btn-container {
  display: flex;
  justify-content: space-around;
  padding: 0.2em 0;
}
</style>