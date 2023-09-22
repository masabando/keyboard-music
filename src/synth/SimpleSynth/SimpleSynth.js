import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import './SimpleSynth.scss';


function SimpleSound(props) {
  const [state, setState] = useState(false);
  const isSharp = props.sound.label.includes('#');
  const soundStart = () => { setState(true); }
  const soundEnd = () => { setState(false); }
  const map = props.sound.map;
  useEffect(() => {
    document.addEventListener(`soundStart-${map}`, soundStart);
    document.addEventListener(`soundEnd-${map}`, soundEnd);
    return () => {
      document.removeEventListener(`soundStart-${map}`, soundStart);
      document.removeEventListener(`soundEnd-${map}`, soundEnd);
    }
    // eslint-disable-next-line
  }, [props.sound]);
  return (
    <div className={`key key-${isSharp ? "black" : "white"} ${state ? "active" : ""}`} id={`key-${map}`}>
      <span>{props.sound.map.toUpperCase()}</span>
    </div>
  );
}

export default function SimpleSynth(props) {
  const defaultVolume = 1.0;
  // eslint-disable-next-line
  const [soundState, setSoundState] = useState({});
  let sounds = {};

  const keyDown = (e) => {
    if (sounds[e.key] !== undefined) {
      let s = sounds[e.key];
      if (s.interval) clearInterval(s.interval);
      s.gain.gain.value = defaultVolume;
      document.dispatchEvent(s.event.startEvent);
      props.KM.audioCtx.resume();
    }
  }
  const keyUp = (e) => {
    if (sounds[e.key] !== undefined) {
      let s = sounds[e.key];
      s.gain.gain.value = defaultVolume;
      s.interval = setInterval(() => {
        s.gain.gain.value -= 0.02;
        if (s.gain.gain.value <= 0.0) {
          clearInterval(s.interval);
          s.gain.gain.value = 0.0;
          document.dispatchEvent(s.event.endEvent);
        }
      }, 10);
    }
  }
  useEffect(() => {
    props.KM.config.sounds.filter(s => s.map).forEach(s => {
      const oscillator = props.KM.audioCtx.createOscillator();
      const gain = props.KM.audioCtx.createGain();
      gain.gain.value = 0.0;
      gain.connect(props.KM.gainNode);
      oscillator.connect(gain);
      oscillator.type = props.KM.config.oscillator.type[0];
      oscillator.frequency.value = s.hz;
      oscillator.start();
      sounds[s.map] = {
        oscillator,
        gain,
        interval: null,
        press: false,
        event: {
          startEvent: new CustomEvent(`soundStart-${s.map}`),
          endEvent: new CustomEvent(`soundEnd-${s.map}`)
        }
      };
    });
    setSoundState(sounds);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
    }
    // eslint-disable-next-line
  }, [props.KM.config]);

  return (
    <Container fluid>
      {
        props.KM.config.sounds.filter(s => s.map).map((sound, i) => {
          return (
            <SimpleSound key={`simple-sound-${i}`} sound={sound} />
          );
        })
      }
    </Container>
  );
}