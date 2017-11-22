import Vue from 'vue'
import App from './App.vue'

// Plugins
import AudioInputPlugin from './AudioInputPlugin';
import VueRouter from 'vue-router'

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

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
