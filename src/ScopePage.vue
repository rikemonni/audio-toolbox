<template>
  <div class="content">
    <div class="controls">
      <label for="gain">gain:</label>
      <input id="gain" class="input-field" type="number" v-model="gain" min="0.01" step="0.01" max="2.0">
      <label for="y">y-pos:</label>
      <input id="y" class="input-field" type="number" v-model="yPos" min="-330" step="1" max="330">
      <button class="button">ctrl</button>
    </div>
    <scope :gain="gain" :yPos="yPos"></scope>
  </div>
</template>

<script>

import GridOverlay from "./GridOverlay.vue";
import Scope from "./Scope.vue";

export default {
  name: "scope-page",
  components: {
    "grid-overlay": GridOverlay,
    "scope": Scope
  },
  data: function() {
    return {
      gain: 1.0,
      yPos: 0,
      bufferLength: 2048,
    };
  }
};
</script>

<style lang="scss">

.content {
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13px;
}

.controls {
  display: none;
  background-color: #CFCFCF;
  opacity: 0.8;
  width: 100%;
  line-height: 2em;
  box-sizing: border-box;
  color: var(--dark);
  user-select: none;
}

.button {
  background-color: #42b983;
  border-radius: 3px;
  border: solid 3px darken(#42b983, 5%);
  background-image: linear-gradient(0deg, darken(#42b983, 3%), #42b983);
  margin: 1em;
  padding: 0.3em 2em;
  line-height: 1em;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  font-family: "Monaco";
  height: 30px;
  box-sizing: border-box;
  color: var(--dark);

  // Reset button el styles
  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: lighten(#42b983, 5%);
    text-shadow: 5px lighten(#2c3e50, 10%);
    border: solid 3px darken(#42b983, 10%);
  }
  
  &:active {
    background-image: linear-gradient(0deg, darken(#42b983, 7%), #42b983);
  }
}

.input-field {
  background-color: lighten(#42b983, 30%);
  font-size: 1em;
  font-family: "Monaco";
  border: solid 3px #42b983;
  border-radius: 2px;
  box-sizing: border-box;
  color: var(--dark);
  font-weight: bold;

  &:focus {
    outline: 0;
    border: solid 3px darken(#42b983, 5%);    
  }
}

label {
  font-weight: bold;
}

</style>
