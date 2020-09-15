<template>
  <div class="container form--width-setter">
    <form @submit.prevent="onSubmit()" autocomplete="off">
      <div class="form-items">
        <label for="title">Title</label>
        <span class="d-flex">
          <input
            name="title"
            type="text"
            v-model="title"
            class="form-item"
            ref="title"
          />
          <select class="select-box" name="priority" v-model="priority">
            <option value="null" selected disabled>Select Priority</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </span>
      </div>
      <div
        class="form-items"
        :class="{
          'textarea-block': title === '' || priority === null,
          'textarea-block--visible': title !== '' && priority !== null
        }"
      >
        <label for="desc">Description</label>
        <textarea
          name="desc"
          v-model="desc"
          class="form-item-textarea"
          ref="description"
        ></textarea>
      </div>
      <div class="form-items d-flex">
        <button
          class="btn btn-primary"
          :disabled="title === '' || priority === null"
          ref="submit"
        >
          <span v-if="id === ''">Add</span>
          <span v-else>Edit</span>
        </button>
        <button class="btn btn-reset" @click.prevent="reset()">
          <i class="fa fa-repeat"></i> Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { vueBus } from "./../main";
import firebase from "firebase";
import db from "../firebase";
export default {
  data() {
    return {
      id: "",
      title: "",
      desc: "",
      priority: null,
      completed: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.id === "") this.add();
      else this.edit();
    },
    onEdit(item) {
      this.id = item.id;
      this.title = item.todoData.title;
      this.desc = item.todoData.description;
      this.priority = item.todoData.priority;
      this.completed = item.todoData.completed;
    },
    reset() {
      this.id = "";
      this.title = "";
      this.desc = "";
      this.priority = null;
      this.completed = false;
    },
    async add() {
      console.log("add");
      var obj = {
        title: this.title,
        description: this.desc,
        priority: Number.parseInt(this.priority),
        completed: this.completed,
        email: firebase.auth().currentUser.email,
      };
      console.log(obj);
      await db
        .collection("users")
        .where("email", "==", firebase.auth().currentUser.email)
        .get()
        .then((user) => {
          console.log(user);
          user.forEach((element) => {
            db.collection("users")
              .doc(element.id)
              .collection("todos")
              .add(obj)
              .then(() => {
                this.$store.dispatch("addToList", obj);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.reset();
    },
    edit() {
      var obj = {
        id: this.id,
        title: this.title,
        description: this.desc,
        priority: Number.parseInt(this.priority),
        completed: this.completed,
        email: firebase.auth().currentUser.email,
      };
      db.collection("todos")
        .doc(this.id)
        .update(obj)
        .then(() => {
          vueBus.$emit("Reload");
        })
        .catch((err) => console.log(err));
      this.reset();
    },
  },
  mounted() {
    vueBus.$on("Edit", (item) => {
      this.onEdit(item);
    });
  },
};
</script>

<style lang="scss">
</style>
