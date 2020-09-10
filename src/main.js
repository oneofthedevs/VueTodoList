import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import firebase from "firebase";
import "./firebase";

Vue.use(Vuex);
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

export const vueBus = new Vue();
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
