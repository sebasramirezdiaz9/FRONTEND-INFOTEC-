import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import ALVue from "@myshell/alvue";
import VModal from "vue-js-modal";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import VueFileAgent from 'vue-file-agent';

window.axios = require('axios');
Vue.use(VueFileAgent);
Vue.component('flat-pickr',flatPickr); 
Vue.use(VModal, {dialog: true});
Vue.use(ALVue, {});
require('bootstrap');
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
