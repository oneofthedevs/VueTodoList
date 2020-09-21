<template>
  <div class="home">
    <!-- <FormInput /> -->
    <div class="overlay" v-if="overlay">
      <div class="overlay-content">
        <FormInput @closeOverlay="overlay = false" />
      </div>
    </div>
    <TodoList />
    <v-btn
      class="mx-2 floting-btn-rb"
      fab
      dark
      large
      color="cyan"
      :elevation="0"
      @click="overlay = !overlay"
    >
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import FormInput from "@/components/TaskInputForm.vue";
import TodoList from "@/components/TodoList.vue";
export default {
  name: "Home",
  data() {
    return {
      overlay: false,
    };
  },
  components: {
    FormInput,
    TodoList,
  },
  methods: {
    close() {
      this.overlay = false;
    },
  },
  created() {
    document.title = "TodoList";
  },
};
</script>
<style lang="scss" scoped>
@import "../common/styles/style.scss";
.home {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 20px 0 0 0;
  .todo-container {
    flex: 4;
  }
  .form-container {
    flex: 1;
  }
}
.floting-btn-rb {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
.overlay {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 12;
  animation: 100ms fadein ease-in-out;
  .overlay-content {
    height: 100%;
  }
  .close-btn {
    background: #fff;
    z-index: 14;
    position: absolute;
    left: 15px;
    bottom: 50px;
  }
}
</style>
