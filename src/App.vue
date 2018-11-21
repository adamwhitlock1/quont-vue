<template>
  <div id="app"><Sample1 /></div>
</template>

<script>
import Sample1 from "./components/sample1";

export default {
  name: "App",
  components: {
    Sample1
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
