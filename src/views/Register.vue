<template>
  <div class="login-form">
    <form @submit.prevent="onRegister()" class="form-card" autocomplete="off">
      <v-row>
        <v-col>
          <v-text-field
            class="p-1"
            v-model="firstName"
            label="First name"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="lastName"
            label="Last name"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="userName"
        label="E-mail"
        :rules="[rules.required, rules.email]"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="[rules.required, rules.minLength, rules.password]"
        name="input-10-1"
        label="Enter a password"
        @click:append="show = !show"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="[rules.passwordMatch]"
        name="input-10-1"
        label="Confirm password"
        @click:append="show = !show"
      ></v-text-field>
      <v-btn
        class="mt-2"
        :loading="loading"
        :disabled="loading || isEnabled"
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
    </form>
  </div>
</template>

<script>
// import firebase from "firebase";
import { register } from "../services/auth-service";
import {
  addNewUser,
  deleteCurrentUser,
} from "../services/userCollection-service";

import rules from "../common/rules";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      show: false,
      loading: false,
      formError: false,
      rules: {
        ...rules,
        passwordMatch: (value) =>
          value === this.password || "Password does not match",
      },
    };
  },
  methods: {
    async onRegister() {
      this.loading = true;
      let obj = {
        email: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      await register(obj)
        .then(async () => {
          if (await addNewUser(obj)) {
            this.$router.push({ name: "Home" });
          } else {
            throw new Error("Profile not addded");
          }
        })
        .catch((err) => {
          if (err.message !== "Profile not addded") {
            console.log(err);
          } else {
            deleteCurrentUser().then(() => {
              console.log("User Deleted successfully");
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    document.title = "TodoList - Register";
  },
  computed: {
    isEnabled() {
      if (this.userName && this.password && this.firstName && this.lastName)
        return false;
      else return true;
    },
  },
};
</script>

<style></style>
