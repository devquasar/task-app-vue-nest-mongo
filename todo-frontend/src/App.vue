<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import Navbar from "@/components/Navbar";
export default {
  components: { Navbar },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
body {
  font-family: "Montserrat", "Segoe UI", sans-serif;
}
</style>
