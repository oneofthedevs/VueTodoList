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
import firebase from "firebase";
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
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
          return (
            pattern.test(value) ||
            "Password must contain lower case, uppercare character and a symbol"
          );
        },
        minLength: (value) =>
          value.length > 8 || "Password must be 8 characters",
        passwordMatch: (value) =>
          value === this.password || "Password does not match",
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
