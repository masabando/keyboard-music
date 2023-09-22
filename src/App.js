import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/Navbar.js';
import Container from 'react-bootstrap/Container';
import KMNavbar from './components/Navbar';
import SimpleSynth from './synth/SimpleSynth/SimpleSynth';
import defaultConfig from './config/default.json';
import { useEffect, useState } from 'react';
import Automata from './addons/Automata/Automata';

function App() {

  // states
  const [config, setConfig] = useState(defaultConfig);
  const [volume, setVolume] = useState(config.volume);
  //setConfig(config);
  useEffect(() => {
    setVolume(defaultConfig.volume);
    setConfig(defaultConfig);
  }, []);

  // web Audio API
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = volume;

  // props
  const KM = { config, audioCtx, gainNode };

  // actions
  const loadConfig = (e) => {
    let reader = new FileReader();
    reader.addEventListener('load', (event) => {
      setConfig(JSON.parse(event.target.result));
    });
    reader.readAsText(e.target.files[0]);
  }
  const saveConfig = () => {
    alert("未実装");
  }
  const downloadDefault = () => {
    const fileName = 'keyboard-music-default.json';
    const data = new Blob([JSON.stringify(config, null, 2)], { type: 'text/json' });
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', fileName);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <Container fluid className="App mw-100 px-0">
      <KMNavbar loadConfig={loadConfig} saveConfig={saveConfig} downloadDefault={downloadDefault} />
      <SimpleSynth KM={KM} />

      <Automata config={KM.config} />
    </Container>
  );
}

export default App;
