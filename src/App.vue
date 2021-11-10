<template>
  <Nav />
  <Home/>
</template>

<script>
import Nav from "./components/Nav.vue";
import Home from "./routes/Home.vue";
export default {
  name: "App",
  components: {
    Nav,
    Home,
  },
};
</script>

<style>
body {
  background-color: #212529;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
