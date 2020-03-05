import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import Router from 'vue-router'
import Component from 'vue-class-component'
Vue.config.productionTip = false;
const routerPush = Router.prototype.push
Router.prototype.push = function push(location:string) {
  return (routerPush as any).call(this, location).catch((error:any)=> error)
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
