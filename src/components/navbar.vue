<template>
  <nav>
    <v-toolbar dark dense>
      <v-toolbar-title>#Todo</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link v-if="!isLoggedIn" class="link-btn" :to="{ name: 'Login' }"
        ><v-btn text small>Login</v-btn></router-link
      >

      <router-link
        v-if="!isLoggedIn"
        class="link-btn"
        :to="{ name: 'Register' }"
      >
        <v-btn text small>Register</v-btn></router-link
      >

      <router-link v-if="isLoggedIn" class="link-btn" :to="{ name: 'Home' }"
        ><v-btn text small>Dashboard</v-btn></router-link
      >

      <v-btn
        color="error"
        v-if="isLoggedIn"
        class="link-btn btn-warning"
        v-on:click="logout"
      >
        Logout
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import { signOut } from "../services/auth-service";
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: this.$store.getters.isLoggedIn,
      currentUser: "",
    };
  },
  methods: {
    async logout() {
      await signOut().then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
  watch: {
    $route() {
      this.$store.commit("LoggedIn", !!firebase.auth().currentUser);
      this.isLoggedIn = this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss">
nav {
  .link-btn {
    text-decoration: none;
    color: #fff !important;
  }
}
</style>
