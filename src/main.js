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
import ScopePage from './ScopePage.vue'

Vue.use(VueRouter);
Vue.use(AudioInputPlugin);

const routes = [
  {
    path: "*",
    redirect: "/scope"
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
  },
  {
    path: "/scope",
    component: ScopePage
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
