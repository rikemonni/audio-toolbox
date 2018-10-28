<template>
  <div class="content">
  </div>
</template>

<script>

import GridOverlay from "./GridOverlay.vue";
import Scope from "./Scope.vue";

export default {
  name: "full-page-components",
  components: {
    // "scope": Scope,
    // "spectrum": Spectrum,
    // "spectrogram": Spectrogram,
  },
  data: function() {
    return {
      height: undefined,
      width: undefined,
    };
  },
  mounted: function() {
    this.width = this.$el.offsetWidth;
    this.height = this.$el.offsetHeight;
    addEventListener("resize", () => {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
    }); 
  }
};
</script>

<style lang="scss" scoped>

.content {
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13px;
}

</style>
