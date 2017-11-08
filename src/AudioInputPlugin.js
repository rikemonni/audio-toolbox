
const AudioInputPlugin = {
    install(Vue, options) {

      // Add globally distributed options for vue components
      // MediaStrem and Analyser need to share the same audiocontext 
      Vue.prototype.audioContext = new AudioContext();          
      Vue.prototype.analyser = Vue.prototype.audioContext.createAnalyser();
      Vue.prototype.analyser.smoothingTimeConstant = 0;
      Vue.prototype.analyser.fftSize = 2048;

      // Store a reference to meadiastream source
      Vue.prototype.mediaStreamSource = navigator.mediaDevices.getUserMedia({ audio: true })
        .then(mediaStream => {
          console.log("Got media stream from user.");
          return Vue.prototype.audioContext.createMediaStreamSource(mediaStream);
        });

      // When we get the media stream source, connect its input to the analyzer
      Vue.prototype.mediaStreamSource
        .then(source => {
          console.log("Connecting media stream source to analyser.");
          source.connect(Vue.prototype.analyser);
        });

      Vue.prototype.getMediaStremSourceAsync = function() {
        return Vue.prototype.mediaStreamSource;
      }
    }
  };
  
  export default AudioInputPlugin;
  