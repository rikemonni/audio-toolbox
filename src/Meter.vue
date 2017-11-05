<template>
  <div class="container">
    <div class="measurement">
      <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
        <path :d="bgPath" :fill="fill"/>
        <line class="needle" x1="150" y1="300" x2="150" y2="150"
          stroke-width="3" stroke="#2c3e50"
          :style="needleStyles"
          />
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: "meter",
  data: function() {
    return {
      width: 300,
      height: 300,
      fill: "#42b983",
      bgPath: `M0, 300, c 0,-200 300,-200 300,0`,
      needlePath: `M0, 300, c 0,-200 300,-200 300,0`,
    };
  },
  computed: {
    needleStyles: function () {
      return {
        "transform": `rotate(${Math.random() * 90}deg)`
      };
    }
  },
  mounted: function () {
    this.getMediaStremSourceAsync()
      .then(source => {

      });
  }
}

</script>

<style lang="scss">

.container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.measurement {
  width: 300px;
  height: 300px;
  margin: auto;
}

.needle {
  transform-origin: 100% 100%;
}

</style>
