<template>
  <nav>
    <div class="left">
      <h1 v-if="!isLoggedIn">Todo List</h1>
      <h1 v-if="isLoggedIn">Todo list</h1>
    </div>
    <div class="right">
      <router-link v-if="!isLoggedIn" class="link-btn" to="Login"
        >Login</router-link
      >
      <router-link v-if="!isLoggedIn" class="link-btn" to="Register"
        >Register</router-link
      >
      <router-link v-if="isLoggedIn" class="link-btn" to="Home"
        >Dashboard</router-link
      >
      <div v-if="isLoggedIn" class="link-btn btn-warning" v-on:click="logout">
        Logout
      </div>
    </div>
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
          this.$router.push("/");
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
  height: 56px;
  background: var(--clr-green);
  display: flex;
  .left {
    display: flex;
    align-items: center;
    margin: 0 0 0 20px;
    color: var(--clr-background);
    h1 {
      font-weight: 100;
    }
  }
  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
  }

  .btn-warning {
    background: #ef5350 !important;
  }
  .link-btn {
    font-size: 0.9rem;
    padding: 6px 10px;
    margin: 0 15px;
    text-decoration: none;
    background: transparent;
    color: var(--clr-background);
    border-radius: var(--br);
    transition: 300ms ease-in-out;
    cursor: pointer;
    &:hover {
      background: #00c853;
    }
  }
}
</style>
