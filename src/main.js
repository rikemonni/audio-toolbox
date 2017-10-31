import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import Signal from './Signal.vue'
import Spectrum from './Spectrum.vue'
import Spectrogram from './Spectrogram.vue'

Vue.use(VueRouter);

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
  {
    path: "/spectrum",
    component: Spectrum
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
