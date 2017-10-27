import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

import Trend from './Trend.vue'
import Spectrum from './Spectrum.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/time"
  },
  {
    path: "/time",
    component: Trend
  },
  {
    path: "/freq",
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
