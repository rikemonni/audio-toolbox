<template>
  <div class="content">
    <div class="midi-monitor">
      <table class="messages">
        <tr>
          <th>Manufacturer</th>
          <th>Name</th>
          <th>Status</th>
          <th>Control Number</th>
          <th>Value</th>
        </tr>
        <template v-for="message in messages">
          <tr>
            <td>{{ message.manufacturer }}</td>
            <td>{{ message.name }}</td>
            <td>{{ message.status }}</td>
            <td>{{ message.ctrlNum }}</td>
            <td>{{ message.value }}</td>
          </tr>
        </template>

      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'midi-monitor',
  data: function() {
    return {
      messages: []
    }
  },
  methods: {
    onMIDIMessage: function(msg) {
      // console.log(msg);

      this.messages.unshift({
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
        console.log("got midi access", access);
        // Get lists of available MIDI controllers
        const inputs = access.inputs.values();
        const outputs = access.outputs.values();

        for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          input.value.onmidimessage = this.onMIDIMessage;
        }
        // access.onstatechange = function(e) {    
        //    // Print information about the (dis)connected MIDI controller
        //    console.log(e.port.name, e.port.manufacturer, e.port.state);
        //  };
      });

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
}

.messages {
  font-family: "Monaco";
  color: #42b983;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
}

</style>
