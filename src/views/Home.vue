<template>
  <div class="home">
    <Nav />
    <FormInput />
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/navbar.vue";
import FormInput from "@/components/TaskInputForm.vue";
import TodoList from "@/components/TodoList.vue";
export default {
  name: "Home",
  components: {
    FormInput,
    Nav,
    TodoList,
  },
};
</script>
