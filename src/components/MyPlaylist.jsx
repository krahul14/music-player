import React from 'react';
import { PlayIcon, PauseIcon, TrashIcon } from '@heroicons/react/24/outline'; // Ensure Heroicons is installed
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const MyPlaylist = ({ playlist, setPlaylist, currentSong, isPlaying, onPlayPause }) => {
  const handleRemove = (song) => {
    setPlaylist(playlist.filter(item => item !== song));
    toast.error("Song removed from your playlist");
  };

  const isSongPlaying = (song) => currentSong === song && isPlaying;

  return (
    <div className="p-0">
      <ToastContainer />
      <div className="font-bold text-2xl p-4">My Playlist</div>
      <hr className="border border-blue-500" />
      <div className="pt-16"> {/* Add padding top to offset the fixed header */}
        {playlist.length === 0 ? (
          <p className="text-center text-gray-400">No songs in playlist. Add some songs from the music list.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlist.map((song, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{song.title}</h3>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => onPlayPause(song)}
                    >
                      {isSongPlaying(song) ? (
                        <PauseIcon className="w-6 h-6" />
                      ) : (
                        <PlayIcon className="w-6 h-6" />
                      )}
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleRemove(song)}
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlaylist;
