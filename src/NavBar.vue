<template>
  <div class="nav">
    <router-link to="/spectrogram" class="nav-item">spectrogram</router-link>
    <router-link to="/scope" class="nav-item">scope</router-link>
    <router-link to="/spectrum" class="nav-item active">spectrum</router-link>
    <router-link to="/midi-monitor" class="nav-item">MIDI monitor</router-link>
    <router-link to="/tap-tempo" class="nav-item">tap tempo</router-link>
    <router-link to="/signal-generator" class="nav-item">signal generator</router-link>
  </div>
</template>

<script>

export default {
  name: 'nav-bar',
}

</script>

<style lang="scss" scoped>

.nav {
  position: relative;
  top: 0;
  height: 35px;
  width: 100vw;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around; 
  color: hsl(130, 30%, 20%);
  font-weight: bold;
  padding: 0;
  user-select: none;
  background-image: linear-gradient(0deg, darken(#42b983, 5%), #42b983);
}

.nav-item {
  flex: 1;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  color: var(--dark);
  text-decoration: none;
  border: solid 1px #42b983;
  line-height: 33px;
  font-weight: bold;

  &:hover {
    background-color: lighten(#42b983, 3%);
  }
}

.nav-item.router-link-active {
  background-color: darken(#42b983, 10%);
  text-shadow: 1px 1px 0 #42b983;
  text-decoration: underline;
}

</style>
