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
      const height = `${this.sample * 100}%`;
      return {
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
  background-color: hsla(130, 30%, 50%, 1);
}

</style>
