<template>
  <div class="login-form">
    <form @submit.prevent="onRegister()" class="form-card" autocomplete="off">
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
        :disabled="loading"
        color="secondary"
        @click="onRegister"
      >
        Sign Up
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
      <!-- <div class="form-items">
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
      </div> -->
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
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      loading: false,
      formError: false,
    };
  },
  methods: {
    onRegister() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then((user) => {
          console.log(user);
          this.$router.push({ name: "Home" });
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
