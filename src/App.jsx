import './App.css';
import AudioSpectrum from 'react-audio-spectrum';
import { useRef, useState } from 'react';
import { FaExpand } from 'react-icons/fa';
import { parseBlob } from 'music-metadata';

import { encode } from 'base64-arraybuffer';

function App() {
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [coverArt, setCoverArt] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAudioSrc(objectUrl);

      try {
        const metadata = await parseBlob(file);
        console.log(metadata);

        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const cover = metadata.common.picture[0];
          const base64String = encode(cover.data);
          const imageUrl = `data:${cover.format};base64,${base64String}`;
          setCoverArt(imageUrl);
        }
      } catch (error) {
        console.error('Error leyendo etiquetas: ', error);
      }

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Audio Player</h1>

      <button
        onClick={toggleFullscreen}
        className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        <FaExpand className="mr-2" /> Toggle Fullscreen
      </button>

      <div className="mb-4">
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
        className="mb-4"
      />

      {coverArt && <img src={coverArt} alt="Cover Art" style={{ width: '300px', height: '300px' }} />}

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
          { stop: 1, color: 'yellow' },
        ]}
        gap={4}
      />
    </div>
  );
}

export default App;
