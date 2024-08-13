import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import MusicList from './components/MusicList';
import MyPlaylist from './components/MyPlaylist';

const App = () => {
  const [currentView, setCurrentView] = useState('music');
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = (song) => {
    if (currentSong === song) {
      // Toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Play new song
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {currentView === 'music' && (
            <MusicList
              playlist={playlist}
              setPlaylist={setPlaylist}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
            />
          )}
          {currentView === 'playlist' && (
            <MyPlaylist playlist={playlist} setPlaylist={setPlaylist} />
          )}
        </div>
        <Player
          playlist={playlist}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPauseToggle={handlePlayPause}
        />
      </div>
    </div>
  );
};

export default App;
