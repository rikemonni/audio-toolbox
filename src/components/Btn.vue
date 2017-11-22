<template>
  <button :class="computedClass" v-on:click="toggle">
    {{ text }}
  </button>
</template>

<script>

export default {
  name: "btn",
  props: ["toggled", "text"],
  computed: {
    computedClass: function() {
      return `button ${ this.toggled ? "button--toggled" : "" }`;
    }
  },
  methods: {
    toggle: function() {
      this.$emit("toggle", !this.toggled);
    }
  }
};

</script>

<style lang="scss">

.button {
  border: solid 1px darken(#2c3e50, 10%);
  font-weight: bold;
  font-size: 1em;
  font-family: "Monaco";
  outline: 0;
  border-radius: 5px;
  padding: 0.2em 0.5em;
  margin: 0 0.2em;
  background-image: linear-gradient(0deg, darken(#42b983, 5%), #42b983);
  background-color: var(--green);
  color: var(--dark);
  user-select: none;
  user-select: none;
  box-shadow: 5px 5px 10px darken(#2c3e50, 10%); 
  position: relative;
  box-sizing: border-box;
}
.button--toggled {
  top: 2px;
  background-image: linear-gradient(0deg, darken(#42b983, 15%), darken(#42b983, 5%));
  color: darken(#2c3e50, 20%);
  box-shadow: 3px 3px 10px darken(#2c3e50, 10%);
  border: solid 2px darken(#2c3e50, 10%);
}

</style>