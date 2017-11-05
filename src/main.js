import Vue from 'vue'
import App from './App.vue'

// Plugins
import AudioInputPlugin from './AudioInputPlugin';
import VueRouter from 'vue-router'

// Router View Components
import Signal from './Signal.vue'
// import Spectrum from './Spectrum.vue'
import Spectrogram from './Spectrogram.vue'
import Meter from './Meter.vue'

Vue.use(VueRouter);
Vue.use(AudioInputPlugin);

const routes = [
  {
    path: "*",
    redirect: "/signal"
  },
  {
    path: "/signal",
    component: Signal
  },
  {
    path: "/spectrogram",
    component: Spectrogram
  },
  // {
  //   path: "/spectrum",
  //   component: Spectrum
  // },
  {
    path: "/meter",
    component: Meter
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
