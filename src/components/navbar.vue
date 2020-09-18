<template>
  <nav>
    <v-toolbar dark dense class="bg-black" :elevation="0">
      <v-toolbar-title>#Todo</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="lg-screen">
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
      </div>
      <div class="sm-screen">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-if="!isLoggedIn">
              <router-link
                v-if="!isLoggedIn"
                class="link-btn"
                :to="{ name: 'Login' }"
                ><v-btn text small>Login</v-btn></router-link
              >
            </v-list-item>
            <v-list-item v-if="!isLoggedIn">
              <router-link
                v-if="!isLoggedIn"
                class="link-btn"
                :to="{ name: 'Register' }"
              >
                <v-btn text small>Register</v-btn></router-link
              >
            </v-list-item>
            <v-list-item v-if="isLoggedIn">
              <router-link
                v-if="isLoggedIn"
                class="link-btn"
                :to="{ name: 'Home' }"
                ><v-btn text small>Dashboard</v-btn></router-link
              >
            </v-list-item>
            <v-list-item v-if="isLoggedIn">
              <v-btn
                color="error"
                class="link-btn btn-warning"
                v-on:click="logout"
              >
                Logout
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
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
@import "../common/styles/style.scss";
nav {
  z-index: 2;
}
.sm-screen {
  display: none;
}

@media screen and (max-width: 786px) {
  .sm-screen {
    display: block;
  }
  .lg-screen {
    display: none;
  }
}
nav {
  .link-btn {
    text-decoration: none !important;
    color: #fff !important;
  }
}
</style>
