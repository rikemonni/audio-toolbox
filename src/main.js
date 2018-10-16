import Vue from 'vue'
import App from './App.vue'

// Plugins
import AudioInputPlugin from './AudioInputPlugin';
import VueRouter from 'vue-router'
import Vuex from 'vuex';

// Router View Components
import Spectrum from './Spectrum.vue'
import Spectrogram from './Spectrogram.vue'
import ScopePage from './ScopePage.vue'
import MIDIMonitor from './MIDIMonitor.vue'
import TapTempo from './TapTempo.vue'
import SignalGenerator from './SignalGenerator.vue'

// Finalize:
// import Meter from './Meter.vue'
// import Tuner from './Tuner.vue'
import FullPageComponents from './FullPageComponents.vue'

Vue.use(VueRouter);
Vue.use(AudioInputPlugin);
Vue.use(Vuex);

const routes = [
  {
    path: "*",
    redirect: "/scope"
  },
  {
    path: "/spectrogram",
    component: Spectrogram
  },
  {
    path: "/spectrum",
    component: Spectrum
  },
  {
    path: "/scope",
    component: ScopePage
  },
  {
    path: "/midi-monitor",
    component: MIDIMonitor
  },
  {
    path: "/tap-tempo",
    component: TapTempo
  },
  {
    path: "/signal-generator",
    component: SignalGenerator
  },
  {
    path: "/full",
    component: FullPageComponents
  },
//   {
//     path: "/meter",
//     component: Meter
//   },
//   {
//     path: "/tuner",
//     component: Tuner
//   }
];

const router = new VueRouter({
  routes
});

function binarySearch(i, notes, freq, start, end) {
    if (i + 1 < end && notes[i].freq <= freq && notes[i + 1].freq >= freq) {
        console.log("1. found match");
        if (Math.abs(notes[i].freq - freq) < Math.abs(notes[i + 1].freq - freq)) {
            return i;
        } else {
            return i + 1;
        }
    } else if (i - 1 > start && notes[i - 1].freq <= freq && notes[i].freq >= freq) {
        console.log("2. found match");
        if (Math.abs(notes[i].freq - freq) < Math.abs(notes[i - 1].freq - freq)) {
            return i;
        } else {
            return i - 1;
        }
    } else if (notes[i].freq > freq) {
        return binarySearch(Math.floor(end - i / 2), notes, freq, i, end);
    } else {
        return binarySearch(Math.floor(start + i / 2), notes, freq, start, i);
    }
}

const store = new Vuex.Store({
  state: {
    freq: 440,
    amplitude: 0,
    waveform: "sine",
    notes: [
      {
          "note": "C0",
          "freq": 16.35
      },
      {
          "note": "C#0/Db0",
          "freq": 17.32
      },
      {
          "note": "D0",
          "freq": 18.35
      },
      {
          "note": "D#0/Eb0",
          "freq": 19.45
      },
      {
          "note": "E0",
          "freq": 20.6
      },
      {
          "note": "F0",
          "freq": 21.83
      },
      {
          "note": "F#0/Gb0",
          "freq": 23.12
      },
      {
          "note": "G0",
          "freq": 24.5
      },
      {
          "note": "G#0/Ab0",
          "freq": 25.96
      },
      {
          "note": "A0",
          "freq": 27.5
      },
      {
          "note": "A#0/Bb0",
          "freq": 29.14
      },
      {
          "note": "B0",
          "freq": 30.87
      },
      {
          "note": "C1",
          "freq": 32.7
      },
      {
          "note": "C#1/Db1",
          "freq": 34.65
      },
      {
          "note": "D1",
          "freq": 36.71
      },
      {
          "note": "D#1/Eb1",
          "freq": 38.89
      },
      {
          "note": "E1",
          "freq": 41.2
      },
      {
          "note": "F1",
          "freq": 43.65
      },
      {
          "note": "F#1/Gb1",
          "freq": 46.25
      },
      {
          "note": "G1",
          "freq": 49
      },
      {
          "note": "G#1/Ab1",
          "freq": 51.91
      },
      {
          "note": "A1",
          "freq": 55
      },
      {
          "note": "A#1/Bb1",
          "freq": 58.27
      },
      {
          "note": "B1",
          "freq": 61.74
      },
      {
          "note": "C2",
          "freq": 65.41
      },
      {
          "note": "C#2/Db2",
          "freq": 69.3
      },
      {
          "note": "D2",
          "freq": 73.42
      },
      {
          "note": "D#2/Eb2",
          "freq": 77.78
      },
      {
          "note": "E2",
          "freq": 82.41
      },
      {
          "note": "F2",
          "freq": 87.31
      },
      {
          "note": "F#2/Gb2",
          "freq": 92.5
      },
      {
          "note": "G2",
          "freq": 98
      },
      {
          "note": "G#2/Ab2",
          "freq": 103.83
      },
      {
          "note": "A2",
          "freq": 110
      },
      {
          "note": "A#2/Bb2",
          "freq": 116.54
      },
      {
          "note": "B2",
          "freq": 123.47
      },
      {
          "note": "C3",
          "freq": 130.81
      },
      {
          "note": "C#3/Db3",
          "freq": 138.59
      },
      {
          "note": "D3",
          "freq": 146.83
      },
      {
          "note": "D#3/Eb3",
          "freq": 155.56
      },
      {
          "note": "E3",
          "freq": 164.81
      },
      {
          "note": "F3",
          "freq": 174.61
      },
      {
          "note": "F#3/Gb3",
          "freq": 185
      },
      {
          "note": "G3",
          "freq": 196
      },
      {
          "note": "G#3/Ab3",
          "freq": 207.65
      },
      {
          "note": "A3",
          "freq": 220
      },
      {
          "note": "A#3/Bb3",
          "freq": 233.08
      },
      {
          "note": "B3",
          "freq": 246.94
      },
      {
          "note": "C4",
          "freq": 261.63
      },
      {
          "note": "C#4/Db4",
          "freq": 277.18
      },
      {
          "note": "D4",
          "freq": 293.66
      },
      {
          "note": "D#4/Eb4",
          "freq": 311.13
      },
      {
          "note": "E4",
          "freq": 329.63
      },
      {
          "note": "F4",
          "freq": 349.23
      },
      {
          "note": "F#4/Gb4",
          "freq": 369.99
      },
      {
          "note": "G4",
          "freq": 392
      },
      {
          "note": "G#4/Ab4",
          "freq": 415.3
      },
      {
          "note": "A4",
          "freq": 440
      },
      {
          "note": "A#4/Bb4",
          "freq": 466.16
      },
      {
          "note": "B4",
          "freq": 493.88
      },
      {
          "note": "C5",
          "freq": 523.25
      },
      {
          "note": "C#5/Db5",
          "freq": 554.37
      },
      {
          "note": "D5",
          "freq": 587.33
      },
      {
          "note": "D#5/Eb5",
          "freq": 622.25
      },
      {
          "note": "E5",
          "freq": 659.25
      },
      {
          "note": "F5",
          "freq": 698.46
      },
      {
          "note": "F#5/Gb5",
          "freq": 739.99
      },
      {
          "note": "G5",
          "freq": 783.99
      },
      {
          "note": "G#5/Ab5",
          "freq": 830.61
      },
      {
          "note": "A5",
          "freq": 880
      },
      {
          "note": "A#5/Bb5",
          "freq": 932.33
      },
      {
          "note": "B5",
          "freq": 987.77
      },
      {
          "note": "C6",
          "freq": 1046.5
      },
      {
          "note": "C#6/Db6",
          "freq": 1108.73
      },
      {
          "note": "D6",
          "freq": 1174.66
      },
      {
          "note": "D#6/Eb6",
          "freq": 1244.51
      },
      {
          "note": "E6",
          "freq": 1318.51
      },
      {
          "note": "F6",
          "freq": 1396.91
      },
      {
          "note": "F#6/Gb6",
          "freq": 1479.98
      },
      {
          "note": "G6",
          "freq": 1567.98
      },
      {
          "note": "G#6/Ab6",
          "freq": 1661.22
      },
      {
          "note": "A6",
          "freq": 1760
      },
      {
          "note": "A#6/Bb6",
          "freq": 1864.66
      },
      {
          "note": "B6",
          "freq": 1975.53
      },
      {
          "note": "C7",
          "freq": 2093
      },
      {
          "note": "C#7/Db7",
          "freq": 2217.46
      },
      {
          "note": "D7",
          "freq": 2349.32
      },
      {
          "note": "D#7/Eb7",
          "freq": 2489.02
      },
      {
          "note": "E7",
          "freq": 2637.02
      },
      {
          "note": "F7",
          "freq": 2793.83
      },
      {
          "note": "F#7/Gb7",
          "freq": 2959.96
      },
      {
          "note": "G7",
          "freq": 3135.96
      },
      {
          "note": "G#7/Ab7",
          "freq": 3322.44
      },
      {
          "note": "A7",
          "freq": 3520
      },
      {
          "note": "A#7/Bb7",
          "freq": 3729.31
      },
      {
          "note": "B7",
          "freq": 3951.07
      },
      {
          "note": "C8",
          "freq": 4186.01
      },
      {
          "note": "C#8/Db8",
          "freq": 4434.92
      },
      {
          "note": "D8",
          "freq": 4698.63
      },
      {
          "note": "D#8/Eb8",
          "freq": 4978.03
      },
      {
          "note": "E8",
          "freq": 5274.04
      },
      {
          "note": "F8",
          "freq": 5587.65
      },
      {
          "note": "F#8/Gb8",
          "freq": 5919.91
      },
      {
          "note": "G8",
          "freq": 6271.93
      },
      {
          "note": "G#8/Ab8",
          "freq": 6644.88
      },
      {
          "note": "A8",
          "freq": 7040
      },
      {
          "note": "A#8/Bb8",
          "freq": 7458.62
      },
      {
          "note": "B8",
          "freq": 7902.13
      }
    ],
    dominantFreq: 0,
  },
  mutations: {
    changeWaveform (state, waveform) {
      if (["sine", "square", "triangle", "saw"].indexOf(waveform) === -1) {
        throw new Error("Trying to change to invalid waveform", waveform);
      }
      state.waveform = waveform;
    },
    changeFreq(state, freq) {
      state.freq = Math.round(freq * 100) / 100;
    },
    changeAmplitude(state, amplitude) {
      state.amplitude = Math.round(amplitude * 100) / 100;
    },
    updateDominantFreq(state, freq) {
        state.dominantFreq = freq;
    }
  },
  getters: {
    soundOn: state => state.amplitude > 0,
    closestNote: state => {
        // first check if the dominantFreq is close to the current closestNote
        return state.notes[54].note;
        // binary search
        try {
            const i = binarySearch(state.notes.length/2, state.notes, state.dominantFreq, 0, state.notes.length);
            console.log("closest note", i, state.notes[i]);
        } catch (e) {
            console.log("CAUGHT THE BASTARD")
        }
    }
  }
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
