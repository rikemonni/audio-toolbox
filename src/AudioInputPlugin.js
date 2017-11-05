
const AudioInputPlugin = {
    install(Vue, options) {
      Vue.prototype.audioContext = new AudioContext();          
      
      // Store a reference to meadiastream source
      Vue.prototype.mediaStreamSource = navigator.mediaDevices.getUserMedia({audio: true})
        .then(mediaStream => {
          return Vue.prototype.audioContext.createMediaStreamSource(mediaStream);
        });

      Vue.prototype.getMediaStremSourceAsync = function() {
        return Vue.prototype.mediaStreamSource;
      }
    }
  };
  
  export default AudioInputPlugin;
  