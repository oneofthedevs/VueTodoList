<template>
  <div class="list-flex">
    <TodoItem
      v-for="item in todoList"
      :key="item.id"
      :item="item"
      @Edit="onEdit"
      @Delete="onDelete"
      @Checked="saveEdit"
    />
  </div>
</template>

<script>
import db from "./../firebase";
import TodoItem from "./TodoItem";
import { vueBus } from "./../main";
import todoService from "../services/todoCollectionService";
// import firebase from "firebase";
// import TodoList from "@/components/TodoList.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      todoList: [],
      user: "",
    };
  },
  methods: {
    async fetchTodos() {
      this.todoList = await todoService.getAll();
    },
    onEdit(item) {
      vueBus.$emit("Edit", item);
    },
    async onDelete(item) {
      await db
        .collection("todos")
        .doc(item)
        .delete()
        .then(() => {
          this.fetchTodos();
        });
    },
    // async onReload() {
    //   await this.fetchTodos();
    // },
    async saveEdit(item) {
      const id = item.id;
      ``;
      delete item.id;
      item = item.todoData;
      await db
        .collection("todos")
        .doc(id)
        .update(item)
        .then(() => {
          this.fetchTodos();
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.fetchTodos();
    vueBus.$on("Reload", () => {
      this.onReload();
    });
  },
};
</script>

<style lang="scss">
.list-flex {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>
