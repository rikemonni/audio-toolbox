<template>
  <div class="grid-overlay">
  </div>
</template>

<script>

export default {
  name: 'grid-overlay',
}

</script>

<style lang="scss">
$line-color: rgba(66, 185, 131, 0.3);

.grid-overlay {
    background-color: transparent;
    background-image: linear-gradient(
      0deg, transparent 24%, $line-color 25%, $line-color 26%, transparent 27%, transparent 74%,
      $line-color 75%, $line-color 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, $line-color 25%, $line-color 26%, transparent 27%,
        transparent 74%, $line-color 75%, $line-color 76%, transparent 77%, transparent);
    background-size:50px 50px;
    
    height:100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

</style>
