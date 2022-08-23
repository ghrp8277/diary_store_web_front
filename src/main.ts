import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./services/fontAwesome";
import VueCompositionAPI from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

Vue.use(PiniaVuePlugin);

Vue.component("font-awesome-icon", FontAwesomeIcon);

const pinia = createPinia();

new Vue({
  router,
  store,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
