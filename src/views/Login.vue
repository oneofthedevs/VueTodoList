<template>
  <div class="login-form">
    <form @submit.prevent="onLogin()" class="form-card" autocomplete="off">
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
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          this.$router.push("/Home");
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    document.title = "TodoList - Login";
  },
};
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-basis: 500px;
  justify-content: center;
  height: inherit;
}
.form-card {
  border-radius: var(--br);
  // border: 1px solid var(--clr-font);
  padding: 30px 20px 20px 20px;
  margin: 30px 0;
  // box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
}
</style>
