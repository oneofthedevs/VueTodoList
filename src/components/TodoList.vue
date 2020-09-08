<template>
  <div class="container-fluid mt-1 list-flex">
    <TodoItem
      v-for="item in todoList"
      :key="item.id"
      :item="item"
      @Edit="onEdit"
      @Delete="onDelete"
      @Checked="onCompleted"
    />
  </div>
</template>

<script>
import db from "./../firebase";
import TodoItem from "./TodoItem";
import { vueBus } from "./../main";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  data() {
    return {
      todoList: [],
    };
  },
  methods: {
    async fetchTodos() {
      this.todoList = [];
      await db
        .collection("todos")
        .orderBy("completed")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              todoData: doc.data(),
            };
            this.todoList.push(data);
          });
        });
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
    async onCompleted(item) {
      console.log(item);
    },
    async onSubmit(item) {
      await db
        .collection("todos")
        .add(item)
        .then(() => {
          this.fetchTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async saveEdit(item) {
      const id = item.id;
      console.log(id);
      delete item.id;
      console.log(item);
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
    vueBus.$on("Submit", (item) => {
      this.onSubmit(item);
    });
    vueBus.$on("SaveEdit", (item) => {
      this.saveEdit(item);
    });
  },
};
</script>

<style lang="scss">
.list-flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
