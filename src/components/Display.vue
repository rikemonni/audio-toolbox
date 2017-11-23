<template>
  <div class="display">
    <div class="measurements">
      <meas :description="freq.description" :value="freqVal" :unit="freq.unit"
        :min="freq.min" :max="freq.max" :step="freq.step"
        v-on:valueChanged="changeFreq"
        v-on:adjustValue="adjustFreq"
        >
      </meas>
      <meas :description="ampl.description"  :value="amplitudeVal" :unit="ampl.unit"
        :min="ampl.min" :max="ampl.max" :step="ampl.step"
        v-on:valueChanged="changeAmpl"
        v-on:adjustValue="adjustAmpl">
      </meas>
    </div>
    <note-display :freq="freqVal" v-on:changeFreq="changeFreq">
    </note-display> 
  </div>
</template>

<script>

import Meas from './Meas.vue';
import NoteDisplay from './NoteDisplay.vue';

export default {
  name: "display",
  props: {
    "freqVal": {
      type: Number,
      required: true,
    },
    "amplitudeVal": {
      type: Number,
      required: true,
    }
  },
  methods: {
    clipValue: function(value, max) {
      return Math.max(-max, Math.min(value, max));
    },
    changeFreq: function(freq) {
      if (typeof freq !== "number" || !Number.isFinite(freq)) {
        return;
      }
      if (freq > this.freq.max) {
        freq = this.freq.max;
      }
      if (freq < this.freq.min) {
        freq = this.freq.min;
      }
      this.$emit("changeFreq", freq);
    },
    adjustFreq: function(adjustAmnt) {
      // adjustAmnt is something like -1000 to 1000
      // make it so that maximum adjustment value is 10% of the scale 
      const clipped = this.clipValue(adjustAmnt, 0.1 * (this.freq.max - this.freq.min));
      this.changeFreq(this.freqVal + clipped);
    },
    changeAmpl: function(ampl) {
      if (typeof ampl !== "number" || !Number.isFinite(ampl)) {
        return;
      }
      if (ampl > this.ampl.max) {
        ampl = this.ampl.max;
      }
      if (ampl < this.ampl.min) {
        ampl = this.ampl.min;
      }
      this.$emit("changeAmpl", ampl);
    },
    adjustAmpl: function(adjustAmnt) {
      const clipped = this.clipValue(adjustAmnt, 0.01 * (this.ampl.max - this.ampl.min));
      this.changeAmpl(this.amplitudeVal + clipped);
    },
  },
  data: function() {
    return {
      ampl: {
        description: "Amplitude",
        unit: "VU",
        max: 1,
        min: 0,
        step: 0.01
      },
      freq: {
        description: "Frequency",
        unit: "Hz",
        max: 30000,
        min: 20,
        step: 0.01
      }
    };
  },
  components: {
    Meas, NoteDisplay
  }
}
</script>

<style>

.display {
  user-select: none;
}

.measurements {
  margin: 0 auto;
}
</style>