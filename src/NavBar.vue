<template>
  <div class="nav">
    <!-- <router-link to="/meter" class="nav-item">meter</router-link> -->
    <!-- <router-link to="/signal" class="nav-item active">signal</router-link> -->
    <router-link to="/spectrogram" class="nav-item">spectrogram</router-link>
    <router-link to="/scope" class="nav-item">scope</router-link>
  </div>
</template>

<script>

export default {
  name: 'nav-bar',
}

</script>

<style lang="scss">

.nav {
  position: relative;
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
  border-bottom: solid 1px darken(#42b983, 10%);
  user-select: none;
  background-color: #42b983;  
}

.nav-item {
  flex: 1;
  margin: 0;
  height: 100%;
  color: #2c3e50;
  text-decoration: none;
  line-height: 30px;
  border-left: solid 1px darken(#42b983, 15%);

  &:hover {
    background-color: lighten(#42b983, 3%);
  }
}

.nav-item.router-link-active {
  background-color: darken(#42b983, 5%);
  text-decoration: underline;
  &:hover {
    background-color: lighten(#42b983, 3%);
  }
}

</style>
