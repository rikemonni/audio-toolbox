<template>
  <div class="container">
    <div class="measurement">
      <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
        <path :d="bgPath" :fill="fill"/>
        <line class="needle" x1="150" y1="300" x2="0" y2="300"
          stroke-width="3" stroke="#2c3e50"
          :style="needleStyles"
          />
      </svg>
    </div>
  </div>
</template>

<script>
// const sampleData = 2048
// amount of samples in 300ms with 44100 -> 44100 * 0.3 = 13230 
export default {
  name: "meter",
  data: function() {
    return {
      width: 300,
      height: 300,
      fill: "#42b983",
      bgPath: `M0, 300, c 0,-200 300,-200 300,0`,
      needlePath: `M0, 300, c 0,-200 300,-200 300,0`,
      sampleData: new Float32Array(2048),
      riseTime: 300, // 300 ms https://en.wikipedia.org/wiki/VU_meter,
      degree: 0,
      avg: 0,
      timePassed: 0,
    };
  },
  computed: {
    needleStyles: function () {
      return {
        "transform": `rotate(${this.degree}deg)`
      };
    }
  },
  methods: {
    updateData: function() {
      this.analyser.getFloatTimeDomainData(this.sampleData);

      const sum = this.sampleData.reduce((prev, cur) => {
        return cur + prev;
      }, 0);
      this.avg = (this.avg + (sum / this.sampleData.length)) / 2;

      if (Date.now() - this.startTime >= this.riseTime) {
        this.startTime = Date.now();
        this.avg = 0;
      }
      this.degree = (0.1 + this.avg) * 100;
      // requestAnimationFrame(this.updateData);
    },
  },
  mounted: function () {
    this.startTime = Date.now();
    setTimeout(this.updateData, 100);
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
  transition: transform 30ms;
}

</style>
