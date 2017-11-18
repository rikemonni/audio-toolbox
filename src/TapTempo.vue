<template>
    <div class="tap-tempo-container">
        <div class="tap-tempo"
            :class="tapTempoClasses"

            @click="clicked">
            {{ bpm }} bpm
        </div>
    </div>
</template>

<script>

export default {
  name: "tap-tempo",
  data: function() {
    return {
      bpm: 75,
      timeStamps: [],
      curIndex: 0,
    };
  },
  computed: {
      tapTempoClasses: function() {
          if (this.curIndex === 0) {
             return "tap-tempo--blink";
          } else if (this.curIndex === 1) {
              return "tap-tempo--one";
          } else if (this.curIndex === 2) {
              return "tap-tempo--two";
          } else if (this.curIndex === 3) {
              return "tap-tempo--three";
          } else if (this.curIndex === 4) {
              return "tap-tempo--four";
          }
      }
  },
  methods: {
    clicked: function() {
        this.timeStamps[this.curIndex] = Date.now();
        if (this.curIndex === 3) {
            // calculate new bpm
            const intervals = [];
            for (var i = 0; i < 3; ++i) {
                intervals.push(this.timeStamps[i + 1] - this.timeStamps[i]);
            }
            const avgInterval = intervals.reduce((prev, acc) => (prev + acc) / 2 );
            // ms per beat = 1000 * 60 / bpm
            this.bpm = Math.round((1000 * 60 / avgInterval) * 100) / 100;
            this.$el.style.setProperty("--bar-interval", `${4 * 1000 * 60 / this.bpm}ms` );
            this.curIndex = 0;
        } else {
            this.bpm = "--";
            this.curIndex += 1;
        }
      }
  }
};
</script>

<style lang="scss">

.tap-tempo-container {
  width: 100%;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.tap-tempo {
    user-select: none;
    font-size: 2em;
    border-radius: 50%;
    width: 250px;
    height: 250px;
    top: 0;

    box-shadow: 10px 10px 0px darken(#2c3e50, 10%);
    text-shadow: 0 0 5px darken(#2c3e50, 10%);

    display: flex;
    flex-direction: columns;
    align-items: center;
    justify-content: space-around;
    
    border-width: 3px;
    border-style: solid;
    border-color: transparent;

    transition: all 0.3s ease-in-out;

    &:active {
        // background-color: transparentize(#42b984, 0.9);
        box-shadow: 5px 5px 0px darken(#2c3e50, 10%);
        top: 2px;
    }
}

.tap-tempo--one {
    border-top-color: var(--green);
}

.tap-tempo--two {
    border-top-color: var(--green);
    border-right-color: var(--green);
}
.tap-tempo--three {
    border-top-color: var(--green);
    border-right-color: var(--green);
    border-bottom-color: var(--green);
}
.tap-tempo--four {
    border-top-color: var(--green);
    border-right-color: var(--green);
    border-bottom-color: var(--green);
    border-left-color: var(--green);
}

.tap-tempo--blink {
    // initial interval
    --bar-interval: 3200ms;
    animation: var(--bar-interval) infinite normal blink;
    border-color: var(--green);
}

@keyframes blink {
  0% {
    background-color: transparentize(#42b984, 0.9);
    transform: scale(1.04);
  }
  12.5% {
    background-color: var(--dark);
    transform: scale(1);
  }
  25% {
    background-color: transparentize(#42b984, 0.9);
    transform: scale(1.03);
  }
  37.5% {
    background-color: var(--dark);
    transform: scale(1);
  }
  50% {
    background-color: transparentize(#42b984, 0.9);
    transform: scale(1.03);
  }
  57.5% {
    background-color: var(--dark);
    transform: scale(1);
  }
  75% {
    background-color: transparentize(#42b984, 0.9);
    transform: scale(1.03);
  }
  87.5% {
    background-color: var(--dark);
    transform: scale(1);
  }
  100% {
    background-color: transparentize(#42b984, 0.9);
    transform: scale(1.04);
  }
}

</style>
