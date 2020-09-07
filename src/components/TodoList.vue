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
export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  data() {
    return {
      todoList: []
    };
  },
  methods: {
    async fetchTodos() {
      await db
        .collection("todos")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              todoData: doc.data()
            };
            this.todoList.push(data);
          });
        });
    },
    onEdit(item) {
      console.log(item);
    },
    onDelete(item) {
      console.log(item);
    },
    onCompleted(item) {
      console.log(item);
    }
  },
  created() {
    this.fetchTodos();
  }
};
</script>

<style lang="scss">
.list-flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
