<template>
  <div class="content">
    <div class="filters"></div>
    <table class="messages table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Control Number</th>
          <th>Value</th>
          <th>Manufacturer</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="message in messages">
          <tr :key="message.timestamp">
            <td>{{ message.name }}</td>
            <td>{{ message.status }}</td>
            <td>{{ message.ctrlNum }}</td>
            <td>{{ message.value }}</td>
            <td>{{ message.manufacturer }}</td>
            <td> {{ message.timestamp }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
const MAX_MSG_AMNT = 100;

export default {
  name: 'midi-monitor',
  data: function() {
    return {
      timeAlive: 5000, // message expiration time
      messages: [
        {
          name: "START",
          status: "TWEAKING",
          ctrlNum: "KNOBS",
          value: "OK?",
          manufacturer: "",
          timestamp: ">9000"
        }
      ]
    }
  },
  methods: {
    onMIDIMessage: function(msg) {
      this.messages.unshift({
        timestamp: Date.now(),
        manufacturer: msg.currentTarget.manufacturer,
        name: msg.currentTarget.name,
        status: msg.data[0],
        ctrlNum: msg.data[1],
        value: msg.data[2]
      });
      if (this.messages.length >= MAX_MSG_AMNT) {
        this.messages.pop();
      }
    }
  },
  mounted: function() {
      try {
        navigator.requestMIDIAccess()
        .then(access => {
          // Get lists of available MIDI controllers
          const inputs = access.inputs.values();
          const outputs = access.outputs.values();
          for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = this.onMIDIMessage;
          }
        });
      } catch (e) {
        console.error("Your browser doesn't support MIDI access :(");
      }
  }
}

</script>

<style lang="scss" scoped>

.content {
  width: 100%;
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.messages {
  font-family: "Monaco";
  flex: 1;
  box-sizing: border-box;
  position: relative;
  width: 80%;
  margin: 4em;

  thead {
    font-weight: bold;
    text-shadow: 0 0 5px darken(#2c3e50, 10%);
    th {
      text-decoration: underline;
    }
  }

  border-collapse: collapse;
  border-spacing: 1px;
  border-color: var(--green);
  
  tr {
    line-height: 3em;
    border-top: solid 1px transparentize(#42b983, 0.6);
    border-bottom: solid 1px transparentize(#42b983, 0.6);
  }

  &.table-striped tbody tr:nth-of-type(odd) {
      background-color: darken(#2c3e50, 2%);
  }
}

</style>
