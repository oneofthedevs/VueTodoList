<template>
  <div class="form">
    <form @submit.prevent="onLogin()" class="form-card" autocomplete="off">
      <div class="alert-box" v-if="formError">Invalid Email or Password</div>

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
      <button class="btn default-btn" :disabled="isEnable" :loading="loading">
        <span v-if="!loading">LOG IN</span
        ><span class="btn-loading-spinner center" v-if="loading"></span>
      </button>
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
          this.formError = false;
        })
        .catch(() => {
          this.formError = true;
        })
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

<style lang="scss" scoped>
@import "../common/styles/style.scss";
</style>
