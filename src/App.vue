<template>
  <v-app id="app-body">
    <Navbar />
    <router-view class="container"></router-view>
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
#app-body {
  background: $white;
  color: $black;
  max-height: inherit;
  width: 100%;
}
</style>
