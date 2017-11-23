import Vue from 'vue'
import App from './App.vue'

// Plugins
import AudioInputPlugin from './AudioInputPlugin';
import VueRouter from 'vue-router'
import Vuex from 'vuex';

// Router View Components
import Spectrum from './Spectrum.vue'
import Spectrogram from './Spectrogram.vue'
import Meter from './Meter.vue'
import ScopePage from './ScopePage.vue'
import MIDIMonitor from './MIDIMonitor.vue'
import TapTempo from './TapTempo.vue'
import SignalGenerator from './SignalGenerator.vue'

Vue.use(VueRouter);
Vue.use(AudioInputPlugin);
Vue.use(Vuex);

const routes = [
  {
    path: "*",
    redirect: "/scope"
  },
  {
    path: "/spectrogram",
    component: Spectrogram
  },
  {
    path: "/spectrum",
    component: Spectrum
  },
  {
    path: "/meter",
    component: Meter
  },
  {
    path: "/scope",
    component: ScopePage
  },
  {
    path: "/midi-monitor",
    component: MIDIMonitor
  },
  {
    path: "/tap-tempo",
    component: TapTempo
  },
  {
    path: "/signal-generator",
    component: SignalGenerator
  }
];

const router = new VueRouter({
  routes
});


const store = new Vuex.Store({
  state: {
    freq: 440,
    amplitude: 0,
    waveform: "sine",
  },
  mutations: {
    changeWaveform (state, waveform) {
      if (["sine", "square", "triangle", "saw"].indexOf(waveform) === -1) {
        throw new Error("Trying to change to invalid waveform", waveform);
      }
      state.waveform = waveform;
    },
    changeFreq(state, freq) {
      state.freq = Math.round(freq * 100) / 100;
    },
    changeAmplitude(state, amplitude) {
      // round to two decimals
      state.amplitude = Math.round(amplitude * 100) / 100;
    }
  },
  getters: {
    soundOn: state => state.amplitude > 0 
  }
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
