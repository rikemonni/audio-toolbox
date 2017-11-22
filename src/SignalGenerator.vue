<template>
  <div class="container">
    <display
      v-on:changeFreq="changeFreq"
      v-on:changeAmpl="changeAmpl">
    </display>
    <div class="btn-container">
      <btn
        :text="sineText"
        :toggled="sineToggled"
        v-on:toggle="toggleSine">
      </btn>
      <btn 
        :text="squareText"
        :toggled="squareToggled"
        v-on:toggle="toggleSquare">
      </btn>
      <btn 
        :text="sawText"
        :toggled="sawToggled"
        v-on:toggle="toggleSaw">
      </btn>
      <btn 
        :text="triangleText"
        :toggled="triangleToggled"
        v-on:toggle="toggleTriangle">
      </btn>
    </div>
    <div class="btn-container">
      <btn 
        :text="soundText"
        :toggled="soundOn"
        v-on:toggle="toggleSound">
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
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.start();
gainNode.gain.value = 0;
// const speedOfSound = 345;


import Display from './components/Display.vue'
import Btn from './components/Btn.vue';

export default {
  name: 'app',
  computed: {
    sineToggled: function() {
      return this.currentWaveform === "sine";
    },
    squareToggled: function() {
      return this.currentWaveform === "square";
    },
    sawToggled: function() {
      return this.currentWaveform === "sawtooth";
    },
    triangleToggled: function() {
      return this.currentWaveform === "triangle";
    }
  },
  data: function() {
    return {
      sineText: "Sine",
      squareText: "Square",
      sawText: "Saw",
      triangleText: "Triangle",
      soundText: "Off",
      soundOn: false,
      currentWaveform: "sine"
    };
  },
  methods: {
    toggleSine: function(toggled) {
      this.currentWaveform = "sine";
      this.updateWaveform();  
    },
    toggleSquare: function(toggled) {
      this.currentWaveform = "square";      
      this.updateWaveform();
    },
    toggleSaw: function(toggled) {
      this.currentWaveform = "sawtooth";      
      this.updateWaveform();
    },
    toggleTriangle: function(toggled) {
      this.currentWaveform = "triangle";      
      this.updateWaveform();
    },
    updateWaveform: function() {
      oscillator.type = this.currentWaveform;
    },
    changeFreq: function(freq) {
      oscillator.frequency.value = freq;
    },
    changeAmpl: function(ampl) {
      gainNode.gain.value = ampl;
    },
    toggleSound: function(toggled) {
      this.soundText = toggled ? "On" : "Off";
      this.soundOn = toggled;
      this.changeAmpl(toggled ? 1 : 0);
    }
  },
  components: {
    Display, Btn
  }
}
</script>

<style>

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