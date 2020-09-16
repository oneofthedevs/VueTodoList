<template>
  <v-app id="v-app">
    <Navbar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "./common/styles/variables.scss";
#v-app {
  background: $light;
  color: $black;
  max-height: inherit;
  width: 100%;
}
</style>
