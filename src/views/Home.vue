<template>
  <div class="home">
    <FormInput />
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import FormInput from "@/components/TaskInputForm.vue";
import TodoList from "@/components/TodoList.vue";
export default {
  name: "Home",
  components: {
    FormInput,
    TodoList,
  },
  created() {
    document.title = "TodoList";
  },
};
</script>
