import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  //Eager Loading
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  //Eager Loading
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  //Lazy loading
  {
    path: "/Register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  //Wildcard redirect
  {
    path: "*",
    redirect: "Home",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
