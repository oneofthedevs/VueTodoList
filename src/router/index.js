import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import firebase from "firebase";
import Auth from "../views/Auth.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      requiresAuth: true,
      title: "TodoList - Home",
    },
  },
  {
    path: "/Auth",
    name: "Auth",
    component: Auth,
    meta: {
      requiresGuest: true,
    },
    children: [
      {
        path: "Login",
        name: "Login",
        component: Login,
      },
      {
        path: "Register",
        name: "Register",
        component: Register,
      },
    ],
  },
  //Wildcard redirect
  {
    path: "*",
    redirect: { name: "Login" },
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
        path: "/Auth/Login",
        query: {
          redirect: to.path,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((recored) => recored.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.path,
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
