// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueResource from "vue-resource";
import vf from "vue-forage";
import VModal from "vue-js-modal";

Vue.use(VueResource);
Vue.use(vf);
Vue.use(VModal);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
