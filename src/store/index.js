import Vue from "vue";
import Vuex from "vuex";
import db from "../firebase";
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
    async fetchTodoList(state) {
      // state.todoList = [];
      await db
        .collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docu) => {
            db.collection("users")
              .doc(docu.id)
              .collection("todos")
              .get()
              .then((item) => {
                item.forEach((i) => {
                  const data = {
                    id: i.id,
                    todoData: i.data(),
                  };
                  state.commit("addToTodos", data);
                });
              });
          });
        });
    },
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
