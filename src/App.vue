<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
.container {
  margin: 0 25%;
  padding: 20px 0;
}

.mt-1 {
  margin-top: 1rem;
}
.container-fluid {
  margin: 10px;
}

.d-flex {
  display: flex;
}

@media screen and (max-width: 967px) {
  .container {
    margin: 0 10px;
  }
}
</style>
