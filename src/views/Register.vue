<template>
  <div class="login-form">
    <form @submit.prevent="onRegister()" class="form-card" autocomplete="off">
      <div class="form-items">
        <label for="username">Email</label>
        <input
          type="email"
          v-model="username"
          class="form-item"
          name="username"
        />
      </div>
      <div class="form-items">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          class="form-item"
          name="password"
        />
      </div>
      <div class="form-items">
        <button
          class="btn btn-primary mt-1"
          :disabled="username === '' || password === ''"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Register",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then((user) => {
          console.log(user);
          this.$router.push("/Home");
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    document.title = "TodoList - Register";
  },
};
</script>

<style></style>
