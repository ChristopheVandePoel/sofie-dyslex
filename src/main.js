import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueMeta from 'vue-meta'

Vue.config.productionTip = false;


Vue.use(VueMeta);

new Vue({
  store,
  render: h => h(App),
  metaInfo: {
    title: 'Dyslexia - Sofie Gagelmans',
  },
}).$mount('#app');
