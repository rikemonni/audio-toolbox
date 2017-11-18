<template>
  <div class="content">
    <div class="filters"></div>
    <table class="messages table-striped">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Manufacturer</th>
          <th>Name</th>
          <th>Status</th>
          <th>Control Number</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="message in messages">
          <tr :key="message.timestamp">
            <td> {{ message.timestamp }}</td>
            <td>{{ message.manufacturer }}</td>
            <td>{{ message.name }}</td>
            <td>{{ message.status }}</td>
            <td>{{ message.ctrlNum }}</td>
            <td>{{ message.value }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'midi-monitor',
  data: function() {
    return {
      timeAlive: 5000, // message expiration time
      messages: [
        {
          timestamp: Date.now(),
          manufacturer: "MIDI Man",
          name: "name",
          status: "ok",
          ctrlNum: "CC12",
          value: 127
        },
        {
          timestamp: Date.now() + 10000,
          manufacturer: "MIDI Man",
          name: "name",
          status: "ok",
          ctrlNum: "CC12",
          value: 127
        },
        {
          timestamp: Date.now() + 20000,
          manufacturer: "MIDI Man",
          name: "name",
          status: "ok",
          ctrlNum: "CC12",
          value: 127
        },
        {
          timestamp: Date.now() + 30000,
          manufacturer: "MIDI Man",
          name: "name",
          status: "ok",
          ctrlNum: "CC12",
          value: 127
        },
        {
          timestamp: Date.now() + 40000,
          manufacturer: "MIDI Man",
          name: "name",
          status: "ok",
          ctrlNum: "CC12",
          value: 127
        }
      ]
    }
  },
  methods: {
    onMIDIMessage: function(msg) {
      // console.log(msg);

      this.messages.unshift({
        timestamp: Date.now(),
        manufacturer: msg.currentTarget.manufacturer,
        name: msg.currentTarget.name,
        status: msg.data[0],
        ctrlNum: msg.data[1],
        value: msg.data[2]
      });
    }
  },
  mounted: function() {
      navigator.requestMIDIAccess()
      .then(access => {
        // Get lists of available MIDI controllers
        const inputs = access.inputs.values();
        const outputs = access.outputs.values();
        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          input.value.onmidimessage = this.onMIDIMessage;
        }
      });

      // Remove older messages periodically
      // setTimeout(() => {
      //   const curTime = Date.now();
      //   this.messages = this.messages.filter(message => {
      //     message.timestamp + this.timeAlive < curTime;
      //   });
      // }, this.timeAlive / 2);
  }
}

</script>

<style lang="scss">

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
