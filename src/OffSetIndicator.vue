<template>
    <ul class="offset-indicator">
      <li class="box" v-for="i in 5" :key="i"></li>
    </ul> 
</template>

<script>

export default {
  name: "offset-indicator",
  props: {
    target: {
      Type: Number
    },
    value: {
      Type: Number
    }
  }
};
</script>

<style lang="scss" scoped>

.offset-indicator {
  padding: 0;
  height: 40px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.box {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 40px;
  width: 40px;
  margin: 0;
  border: solid 1px var(--green);
  border-radius: 3px;
  margin: 3px;
}

</style>
