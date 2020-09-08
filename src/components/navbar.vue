<template>
  <nav>
    <div class="left"></div>
    <div class="right">
      <router-link v-if="!isLoggedIn" class="link-btn" to="/Login"
        >Login</router-link
      >
      <router-link v-if="!isLoggedIn" class="link-btn" to="/Register"
        >Register</router-link
      >
      <router-link v-if="isLoggedIn" class="link-btn" to="/Home"
        >Dashboard</router-link
      >
      <div v-if="isLoggedIn" class="link-btn" v-on:click="logout">Logout</div>
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
      currentUser: false,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then((x) => console.log(x))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
nav {
  height: 56px;
  background: var(--clr-green);
  .right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
  }
  .link-btn {
    padding: 10px 18px;
    margin: 0 10px;
    background: darkgreen;
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
