<template>
  <div class="home">
    <Nav />
    <FormInput />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/navbar.vue";
import FormInput from "@/components/TaskInputForm.vue";

export default {
  name: "Home",
  components: {
    FormInput,
    Nav
  }
};
</script>
