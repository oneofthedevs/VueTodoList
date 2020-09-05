import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
// const firebaseConfig = {
//   apiKey: "AIzaSyAgHWW1FuylAigl_Sj7K1pfiFy7gRm2rTE",
//   authDomain: "vuejs-todos-dc.firebaseapp.com",
//   databaseURL: "https://vuejs-todos-dc.firebaseio.com",
//   projectId: "vuejs-todos-dc",
//   storageBucket: "vuejs-todos-dc.appspot.com",
//   messagingSenderId: "57552574197",
//   appId: "1:57552574197:web:14df393d386d6f23fb17bc",
//   measurementId: "G-KJW16GB8R8"
// };
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
