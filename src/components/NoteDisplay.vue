<template>
  <div class="note">
    <div class="note-row note-row-controls" v-on:wheel="changeNote" v-on:keydown="handleKeyPress">
        <span class="label">Note: </span>
        <span>{{ note.note }}</span>
    </div>
    <div class="note-row">
        <span class="label">Freq:</span>
        <span>{{ note.freq }}</span>
    </div>
  </div>
</template>

<script>

export default {
    name: "note-display",
    props: {
        "freq": {
            type: Number,
            required: true
        }
  },
  data: function () {
      return {
          note: {
              note: undefined,
              freq: undefined,
          },
          noteIndex: undefined,
      };
  },
  watch: {
      freq: function(newFreq) {
          this.updateState(newFreq);
      }
  },
  mounted: function() {
      this.updateState(this.freq);
  },
  methods: {
    updateState: function(newFreq) {
        const firstOver = this.$store.state.notes.findIndex(note => {
            return note.freq > this.freq;
        });

        const difUnder = this.$store.state.notes[firstOver - 1].freq - this.freq;
        const difOver = this.freq - this.$store.state.notes[firstOver].freq;
        let index;
        if (difUnder > difOver) {
            index = firstOver - 1; 
        } else {
            index = firstOver;
        }

        this.note = this.$store.state.notes[index];
        this.noteIndex = index;
    },
    changeNote: function(event) {
      event.preventDefault();
      let index = this.noteIndex;
      if (event.deltaY < 0) {
        index = this.noteIndex + 1;
      } else {
          index = this.noteIndex - 1;
      }
      this.$emit("changeFreq", this.$store.state.notes[index].freq);
    },
    handleKeyPress: function(event) {
        // up 38, down 40
        if (event.keyCode == 38) {
            event.preventDefault();
            this.$emit("changeFreq", this.$store.state.notes[this.noteIndex + 1].freq);
        } else if (event.keyCode == 40) {
            event.preventDefault();
            this.$emit("changeFreq", this.$store.state.notes[this.noteIndex - 1].freq);
        }
    }
  }
};

</script>

<style>

.note {
  margin: 1em 0;
  text-align: left;
}

.label {
    font-weight: bold;
    text-transform: uppercase;
}

.note-row {
    padding: 0 0.3em;
}

.note-row-controls {
    box-sizing: border-box;
    border: solid 1px transparent;
    transition: all 0.3s ease-in-out; 
}

.note-row-controls:hover {
    border: solid 1px var(--green);
    background-color: darken(#2c3e50, 30%);
}

</style>