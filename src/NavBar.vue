<template>
  <div class="nav">
    <router-link to="/time" class="nav-item active">time domain</router-link>
    <router-link to="/freq" class="nav-item">frequency domain</router-link>
  </div>
</template>

<script>

export default {
  name: 'nav-bar',
}

</script>

<style lang="scss">

.nav {
  background-color: hsla(120, 80%, 100%, 0.5);
  position: absolute;
  top: 0;
  height: 30px;
  width: 100vw;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around; 
  color: hsl(130, 30%, 20%);
  font-weight: bold;
  padding: 0;
}

.nav-item {
  flex: 1;
  margin: 0;
}

.nav-item.router-link-active {
  background-color: hsla(120, 80%, 100%, 0.3);
}
</style>
