<template>
  <nav>
    <v-toolbar dark dense>
      <v-toolbar-title>#Todo</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text small>
        <router-link v-if="!isLoggedIn" class="link-btn" :to="{ name: 'Login' }"
          >Login</router-link
        ></v-btn
      >

      <v-btn text small>
        <router-link
          v-if="!isLoggedIn"
          class="link-btn"
          :to="{ name: 'Register' }"
          >Register</router-link
        >
      </v-btn>
      <v-btn text small>
        <router-link v-if="isLoggedIn" class="link-btn" :to="{ name: 'Home' }"
          >Dashboard</router-link
        >
      </v-btn>
      <v-btn
        color="error"
        v-if="isLoggedIn"
        class="link-btn btn-warning"
        v-on:click="logout"
      >
        Logout
      </v-btn>
    </v-toolbar>
    <!-- <div class="left">
      <h1 class="nav-title">#Todo</h1>
    </div>
    <div class="right">
      <router-link v-if="!isLoggedIn" class="link-btn" :to="{ name: 'Login' }"
        >Login</router-link
      >
      <router-link
        v-if="!isLoggedIn"
        class="link-btn"
        :to="{ name: 'Register' }"
        >Register</router-link
      >
      <router-link v-if="isLoggedIn" class="link-btn" :to="{ name: 'Home' }"
        >Dashboard</router-link
      >
      <div v-if="isLoggedIn" class="link-btn btn-warning" v-on:click="logout">
        Logout
      </div>
    </div> -->
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: "",
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      // this.currentUser = firebase.auth().currentUser.email;
    }
  },
};
</script>

<style lang="scss">
nav {
  .link-btn {
    text-decoration: none;
    color: #fff !important;
  }
  // height: 56px;
  // background: var(--clr-green);
  // display: flex;
  // .left {
  //   display: flex;
  //   align-items: center;
  //   margin: 0 0 0 20px;
  //   color: var(--clr-background);
  //   h1 {
  //     font-weight: 600;
  //   }
  // }
  // .right {
  //   display: flex;
  //   flex: 1;
  //   justify-content: flex-end;
  //   align-items: center;
  //   height: 100%;
  // }

  // .btn-warning {
  //   background: #ef5350 !important;
  //   border-bottom: 5px solid transparent !important;
  //   &:hover {
  //     background: #be4543 !important;
  //   }
  // }
}
</style>
