import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import firebase from "firebase";
import Auth from "../views/Auth.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Auth",
    name: "Auth",
    component: Auth,
    children: [
      {
        path: "/Login",
        name: "Login",
        component: Login,
        meta: {
          requiresGuest: true,
        },
      },
      {
        path: "/Register",
        name: "Register",
        component: Register,
        meta: {
          requiresGuest: true,
        },
      },
    ],
    meta: {
      requiresGuest: true,
    },
  },
  //Wildcard redirect
  {
    path: "*",
    redirect: "Login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Check required auth
  if (to.matched.some((recored) => recored.meta.requiresAuth)) {
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
  } else if (to.matched.some((recored) => recored.meta.requiresGuest)) {
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
