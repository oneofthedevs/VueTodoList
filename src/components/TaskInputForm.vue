<template>
  <div class="card">
    <form class="default-card" @submit.prevent="onSubmit()" autocomplete="off">
      <v-text-field
        class="black-color"
        v-model="title"
        label="Give some fancy title yo"
        :rules="[rules.required]"
      ></v-text-field>
      <v-select
        v-model="priority"
        :items="values"
        label="Select Priority"
        item-text="text"
        item-value="val"
        :rules="[rules.required]"
      ></v-select>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="desc"
      ></v-textarea>
      <div class="flex">
        <button class="btn default-btn f-3 mr-2" disabled="isEnable">
          <span v-if="id">EDIT</span><span v-else>ADD</span>
        </button>
        <button class="btn warning-btn f-1" @click.prevent="close()">
          CLOSE
        </button>
      </div>
    </form>
    <v-bottom-sheet v-model="empty">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" color="red" @click="empty = !empty">CLOSE</v-btn>
        <div class="py-3">
          Chutiye ho tum
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { vueBus } from "./../main";
import firebase from "firebase";
import db from "../firebase";
import rules from "../common/rules";
import todoService from "../services/todoCollectionService";
export default {
  data() {
    return {
      id: "",
      title: "",
      desc: "",
      priority: null,
      completed: false,
      rules: rules,
      empty: false,
      values: [
        { text: "Low", val: 1 },
        { text: "Medium", val: 2 },
        { text: "High", val: 3 },
      ],
    };
  },
  methods: {
    onSubmit() {
      if (this.isEnable) {
        if (this.id === "") this.add();
        else this.edit();
        this.close();
      } else {
        this.empty = true;
      }
    },
    onEdit(item) {
      this.id = item.id;
      this.title = item.todoData.title;
      this.desc = item.todoData.description;
      this.priority = item.todoData.priority;
      this.completed = item.todoData.completed;
    },
    close() {
      console.log("close");
      this.$emit("closeOverlay");
      this.reset();
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
      await todoService.add(obj);
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
    },
  },
  computed: {
    isEnable() {
      return this.title && this.priority ? true : false;
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
@import "../common/styles/style.scss";
.black-color {
  color: black;
  label {
    color: black;
  }
}
</style>
