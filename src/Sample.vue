<template>
  <span
    class="sample"
    :style="styleObject">
  </span>
</template>

<script>

export default {
  name: 'sample',
  props: ["sample"],
  data: function() {
    return {
    }
  },
  computed: {
    styleObject: function() {
      const color = `hsla(${ 130 }, 30%, 50%, 1)`;
      const height = `${this.sample * 100}%`;
      // todo: sample -> height
      // console.log("height", height, this.sample);
      return {
        "background-color": color,
        "height": height 
      };
    }
  }
}

</script>

<style lang="scss">

.sample {
  position: relative;
  width: 1px;
  bottom: 0;
}

</style>
