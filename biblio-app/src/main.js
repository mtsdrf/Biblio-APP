import Vue from 'vue'
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import vmodal from "vue-js-modal";
import VueTheMask from "vue-the-mask";
import HighchartsVue from "highcharts-vue";
import vSelect from "vue-select";

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(vmodal);
Vue.use(VueTheMask);
Vue.use(HighchartsVue);
Vue.component("v-select", vSelect);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
