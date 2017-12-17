<template>
  <div class="tap-tempo-container">
      <div class="tap-tempo"
          :class="tapTempoClasses"
          @click="clicked">
          {{ bpm }} bpm
      </div>
      <div class="time-sig-container">
          <!-- <div class="time-sig--description" title="specify how many beats are to be contained in each measure (bar) and which note value is equivalent to one beat.">
          Time Signature
          </div> -->
          <div class="time-sig">
              <!-- <input
                type="number"
                v-model.number="beatAmnt"
                :min="beatMin"
                :max="beatMax"
                class="beat-amnt"
                @wheel.prevent="changeBeat">
              <span class="divider">/</span>
              <input
                type="number"
                v-model.number="noteValToBeat"
                :min="noteValMin"
                :max="noteValMax"
                class="note-value-to-beat"
                @wheel.prevent="changeNoteVal">
            <hr> -->
            <div class="bar">
                <div class="bar-ticks">
                    <span
                        v-for="i in beatAmnt"
                        :key="i"
                        :class="i <= curIndex || curIndex === 0 ? 'active-tick' : 'inactive-tick'">
                        I
                    </span>
                </div>
                <!-- <div class="measurement-ticks">
                    <span
                        class="tick"
                        v-for="i in noteValToBeat"
                        :key="i">
                        I
                    </span>
                </div> -->
            </div>
        </div>
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
      beatAmnt: 4,
      beatMin: 2,
      beatMax: 10,
      noteValToBeat: 4,
      noteValMin: 2,
      noteValMax: 10,
    };
  },
  computed: {
      tapTempoClasses: function() {
          if (this.curIndex === 0) {
             return "tap-tempo--blink";
          } else {
            return "";
          }
      }
  },
  methods: {
    changeBeat: function(event) {
        if (event.deltaY <= -1 && this.beatAmnt < this.beatMax) {
            this.beatAmnt += 1;
        } else if (event.deltaY >= 1 && this.beatAmnt > this.beatMin) {
            this.beatAmnt -= 1;
        }
    },
    changeNoteVal: function(event) {
        if (event.deltaY <= -1 && this.noteValToBeat < this.noteValMax) {
            this.noteValToBeat += 1;
        } else if (event.deltaY >= 1 && this.noteValToBeat > this.noteValMin) {
            this.noteValToBeat -= 1;
        }
    },
    clicked: function() {
        this.timeStamps[this.curIndex] = Date.now();
        if (this.curIndex === this.beatAmnt - 1) {
            // calculate new bpm
            const intervals = [];
            for (var i = 0; i < (this.beatAmnt - 1); ++i) {
                intervals.push(this.timeStamps[i + 1] - this.timeStamps[i]);
            }
            const avgInterval = intervals.reduce((prev, acc) => (prev + acc) / 2 );
            // ms per beat = 1000 * 60 / bpm
            this.bpm = Math.round((1000 * 60 / avgInterval) * 100) / 100;
            this.$el.style.setProperty("--bar-interval", `${this.beatAmnt * 1000 * 60 / this.bpm}ms` );
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

.time-sig {
    margin-top: 0.25em;
    font-size: 2em;
    &:focus {
        border: solid 1px var(--green);
    }
}

.active-tick, .tick {
  color: var(--green);
}

.inactive-tick {
  color: darken(#42b984, 30%);
}

.active-tick, .inactive-tick, .tick {
    margin: 0 0.3em;
}

hr {
    border-color: var(--green);
    margin: 0.3em 0;
}
.time-sig--description {
    text-transform: uppercase;
    font-weight: bold;
}
.note-value-to-beat, .beat-amnt {
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
    }
    width: 2em;
    font-size: 1em;
    text-align: center;
    font-family: inherit;
    background-color: darken(#2c3e50, 10%);
    color: var(--green);
    outline: 0;
    border: 1px solid transparent;
    box-sizing: border-box;
    &:active, &:focus {
        border: solid 1px var(--green);
    }
}
.divider {
    position: relative;
    width: 1px;
    margin: 0;
}

.bar {
  margin-top: 0.25em;
  display: flex;
  flex-direction: column;
}

.measurement-ticks, .bar-ticks {
    background-color: darken(#2c3e50, 10%);
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    font-size: 1em;
    font-weight: bold;
    height: 1em;
    line-height: 1em;
}
.measurement-ticks {
    // margin-top: 0.25em;
}

.tap-tempo-container {
  max-width: 44em;
  margin: 0 auto;
  height: 100%;
  flex: 1;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  --bar-interval: 3200ms;
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
    border-color: var(--green);

    transition: all 0.3s ease-in-out;

    &:active {
        // background-color: transparentize(#42b984, 0.9);
        box-shadow: 5px 5px 0px darken(#2c3e50, 10%);
        top: 2px;
    }
}

.tap-tempo--blink {
    animation: var(--bar-interval) infinite normal blink;
    border-color: var(--green);
}

@keyframes blink {
  0% {
    background-color: transparentize(#42b984, 0.9);
    transform: scale(1.06);
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
