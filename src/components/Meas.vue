<template>
  <div class="measurement">
    <span class="description">{{ description }}</span>
    <div class="meas-with-unit">
      <input class="input"
        type="number"
        v-on:input="modify"
        v-on:wheel="wheel"
        v-bind:min="min"
        v-bind:max="max"
        v-bind:step="step"
        v-bind:value="value">
      <span class="unit">{{ unit }}</span>
    </div>
  </div>
</template>


<script>

export default {
  name: "meas",
  props: ["value", "min", "max", "step", "description", "unit"],
  methods: {
    modify: function(event) {
      this.$emit("valueChanged", parseFloat(event.target.value));
    },
    wheel: function(event) {
      event.preventDefault();
      // scale is something like (actually pixel amount of scroll) ~ 1000 ---  -1000
      // when scrolling up deltaY is negative
      this.$emit("adjustValue", -parseFloat(event.deltaY));
    }
  }
};

</script>

<style lang="scss">
.measurement {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 1em 0;
}

.description {
  left: 0;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 0 3px darken(#2c3e50, 10%);
}
.meas-with-unit {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
}

.input {
  background-color: darken(#2c3e50, 10%);
  font-size: 1em;
  outline: 0;
  padding: 0.2em;
  color: var(--green);
  /* border: solid 1px chartreuse; */
  border: 0;
  flex: 1;
}
.input::selection {
  background-color: var(--green);
  color: var(--dark);
}
.unit {
  margin-left: 0.5em;
  width: 40px;
}
</style>