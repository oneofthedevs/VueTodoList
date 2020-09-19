import Vue from "vue";
import Vuex from "vuex";
// import db from "../firebase";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [],
    currentTodo: {},
    userId: "",
    isLoggedIn: !!firebase.auth().currentUser,
  },
  mutations: {
    // For Sync
    addToTodos(state, payload) {
      state.todoList.push(payload);
    },
    deleteFromTodo(state, payload) {
      state.todoList.filter((x) => x.id !== payload);
    },
    LoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  actions: {
    // For Async
    addToList(state, payload) {
      state.commit("addToTodos", payload);
    },
    deleteFromList(state, payload) {
      state.todoList = state.todoList.filter((x) => x.id !== payload);
    },
  },
  modules: {},
  getters: {
    getTodos(state) {
      return state.todoList;
    },
    getUserId(state) {
      return state.userId;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
});
