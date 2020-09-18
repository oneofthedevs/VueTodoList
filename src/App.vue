<template>
  <v-app id="app-body">
    <Navbar />
    <router-view></router-view>
    <!-- <Particle /> -->
  </v-app>
</template>

<script>
import Navbar from "./components/navbar";
// import Particle from "./components/Particle";
export default {
  name: "App",
  components: {
    Navbar,
    // Particle,
  },
};
</script>
<style lang="scss">
@import "./common/styles/variables.scss";
#app-body {
  background: $white;
  color: $black;
  max-height: inherit;
  width: 100%;
}
</style>
