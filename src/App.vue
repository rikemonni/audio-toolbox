<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import NavBar from "./NavBar.vue";

export default {
  name: 'app',
  components: {
    "nav-bar": NavBar,
  }
}

</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  --dark: #2c3e50;
  --green: #42b984;

  font-family: "Monaco";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--dark);
  color: var(--green);

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: var(--green);
}
</style>
