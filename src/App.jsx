import './App.css';
import { useRef, useState, useEffect } from 'react';
import { FaExpand } from 'react-icons/fa';
import { parseBlob } from 'music-metadata';
import { encode } from 'base64-arraybuffer';

import Playlist from './components/Playlist';
import Spectrum from './components/Spectrum';

function App() {
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [coverArt, setCoverArt] = useState(null);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const newTracks = await Promise.all(files.map(async (file) => {
      const objectUrl = URL.createObjectURL(file);
      let cover = null;

      try {
        const metadata = await parseBlob(file);
        console.log(metadata);

        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const coverData = metadata.common.picture[0];
          const base64String = encode(coverData.data);
          cover = `data:${coverData.format};base64,${base64String}`;
        }
      } catch (error) {
        console.error('Error leyendo etiquetas: ', error);
      }

      return { name: file.name, src: objectUrl, cover };
    }));

    setPlaylist((prevPlaylist) => [...prevPlaylist, ...newTracks]);
  };

  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setCoverArt(playlist[currentTrackIndex].cover);
    }
  }, [currentTrackIndex, playlist]);

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
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
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          Select Audio Files
        </label>
      </div>

      {playlist.length > 0 && (
        <>
          <audio
            ref={audioRef}
            id="audio-element"
            src={playlist[currentTrackIndex].src}
            controls
            autoPlay
            onEnded={handleEnded}
            className="mb-4"
          />

          {coverArt && <img src={coverArt} alt="Cover Art" style={{ width: '300px', height: '300px' }} />}

          <div className='audio-spectrum-container'>
            <Spectrum audioId='audio-element' />

          </div>

          <Playlist
            playlist={playlist}
            currentTrackIndex={currentTrackIndex}
            onSelectTrack={setCurrentTrackIndex}
          />
        </>
      )}
    </div>
  );
}



export default App;
