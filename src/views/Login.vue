<template>
  <div class="login-form">
    <form @submit.prevent="onLogin()" class="form-card" autocomplete="off">
      <v-text-field
        v-model="username"
        label="E-mail"
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="[rules.required]"
        name="input-10-1"
        label="Enter your password"
        @click:append="show = !show"
      ></v-text-field>
      <v-btn
        class="mt-2"
        :loading="loading"
        :disabled="loading || isEnable"
        color="secondary"
        @click="onLogin"
      >
        Login
      </v-btn>
      <v-alert
        v-if="formError"
        style="margin-top: 20px; text-align: center"
        border="top"
        color="red lighten-2"
        dark
      >
        Invalid Email or Password
      </v-alert>
    </form>
  </div>
</template>

<script>
import { login } from "../services/auth-service";
import rules from "../common/rules";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      show: false,
      rules: rules,
      loading: false,
      formError: false,
    };
  },
  methods: {
    async onLogin() {
      this.loading = true;
      await login(this.username, this.password)
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false;
        });
      // if (response) {
      // } else {
      //   console.log("error");
      // }
      // this.loading = false;
    },
  },
  created() {
    document.title = "TodoList - Login";
  },
  computed: {
    isEnable() {
      if (this.username && this.password) return false;
      else return true;
    },
  },
};
</script>

<style lang="scss">
.login-form {
  display: flex;
  justify-content: center;
  height: inherit;
}
.form-card {
  display: flex;
  flex-direction: column;
  flex-basis: 350px;
  // border: 1px solid var(--clr-font);
  padding: 30px 20px 20px 20px;
  margin: 30px 0;
  // box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
}
</style>
