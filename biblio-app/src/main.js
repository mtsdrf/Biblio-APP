import Vue from 'vue'
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import vmodal from "vue-js-modal";
import VueTheMask from "vue-the-mask";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(vmodal);
Vue.use(VueTheMask);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
