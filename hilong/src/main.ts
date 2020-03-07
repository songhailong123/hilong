import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import Router from 'vue-router';
import Component from 'vue-class-component';
import axios from 'axios';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:3000/'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error)=> error)
}
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'     
 ])
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
