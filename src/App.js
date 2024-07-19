import './App.css';
import AudioSpectrum from 'react-audio-spectrum'

import { useRef, useState } from 'react';

import { FaExpand } from 'react-icons/fa'; // Importa el ícono que deseas usar


function App() {

  const audioRef = useRef(null);

  const [audioSrc, setAudioSrc] = useState('');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      console.log(objectUrl);
      setAudioSrc(objectUrl);
      audioRef.current.load();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Audio player</h1>

      <button
        onClick={toggleFullscreen}
        className="flex 
        items-center 
        bg-green-500 
        hover:bg-green-700 
        text-white 
        font-bold 
        py-2 px-4 
        rounded">
        <FaExpand className="mr-2" /> Toggle Fullscreen
      </button>


      <div className="flex items-center justify-center">
        <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          Select Audio File
        </label>
      </div>

      <audio
        ref={audioRef}
        id="audio-element"
        src={audioSrc}
        controls
        autoPlay
      />

      <AudioSpectrum
        id="audio-canvas"
        height={200}
        width={300}
        audioId="audio-element"
        capColor={'blue'}
        capHeight={2}
        meterWidth={10}
        meterCount={512}
        meterColor={[
          { stop: 0, color: 'orange' },
          { stop: 0.5, color: 'red' },
          { stop: 1, color: 'yellow' }
        ]}
        gap={4}
      />

    </div>
  );
}

export default App;
