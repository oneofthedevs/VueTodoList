import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  //Eager Loading
  {
    path: "/Home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  //Eager Loading
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
  //Lazy loading
  {
    path: "/Register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      requiresGuest: true,
    },
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

router.beforeEach((to, from, next) => {
  // Check required auth
  if (to.matched.sum((recored) => recored.meta.requiresAuth)) {
    // check if not logged in
    if (!firebase.auth().currentUser) {
      next({
        path: "/Login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.sum((recored) => recored.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/Home",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
