import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaRandom,
  FaRedo,
  FaVolumeUp,
  FaStepBackward,
  FaStepForward,
  FaSync, // Reset icon
} from "react-icons/fa";

const Player = ({ playlist, currentSong, isPlaying, onPlayPauseToggle }) => {
  const [volume, setVolume] = useState(0.5);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const handleEnd = () => {
      if (isLooping) {
        audioRef.current.currentTime = 0; // Reset song to the beginning
        audioRef.current.play(); // Play the song again
      } else if (isShuffling) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        onPlayPauseToggle(playlist[randomIndex]);
      } else {
        const nextIndex = (playlist.indexOf(currentSong) + 1) % playlist.length;
        onPlayPauseToggle(playlist[nextIndex]);
      }
    };

    if (audioRef.current) {
      audioRef.current.onended = handleEnd;
    }
    // Cleanup listener on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.onended = null;
      }
    };
  }, [isShuffling, isLooping, playlist, currentSong, onPlayPauseToggle]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  const handlePrevious = () => {
    const prevIndex =
      (playlist.indexOf(currentSong) - 1 + playlist.length) % playlist.length;
    onPlayPauseToggle(playlist[prevIndex]);
    if (!isPlaying) {
      audioRef.current.play();
    }
  };

  const handleNext = () => {
    const nextIndex = (playlist.indexOf(currentSong) + 1) % playlist.length;
    onPlayPauseToggle(playlist[nextIndex]);
    if (!isPlaying) {
      audioRef.current.play();
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="bg-gray-900 backdrop-blur-3xl text-white p-1 rounded-lg shadow-lg w-full max-w-3xl mx-auto flex flex-col space-y-2">
      {/* Current Song Info */}
      <div className="flex flex-col items-center">
        {currentSong ? (
          <div className="relative">
            <img
              src={currentSong.imageUrl}
              alt={currentSong.title}
              className="w-36 h-36 object-cover rounded-full border-4 border-gray-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gray-800 bg-opacity-75 text-center rounded-b-full">
              <p className="text-white text-lg font-semibold">{currentSong.title}</p>
              <p className="text-gray-400">{currentSong.artist}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">No song selected.</p>
        )}
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong ? currentSong.url : ""}
        onTimeUpdate={handleTimeUpdate}
        preload="metadata"
      />

      {/* Playback Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={handlePrevious}
          className="p-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          <FaStepBackward className="text-3xl" />
        </button>
        <button
          onClick={() => onPlayPauseToggle(currentSong)}
          className="p-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          {isPlaying ? <FaPause className="text-3xl" /> : <FaPlay className="text-3xl" />}
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full hover:bg-gray-700 transition-colors"
        >
          <FaStepForward className="text-3xl" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FaVolumeUp className="text-xl" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsShuffling(!isShuffling)}
            className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${isShuffling ? 'text-green-500' : ''}`}
          >
            <FaRandom className="text-xl" />
          </button>
          <button
            onClick={handleReset}
            className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${isLooping ? 'text-green-500' : ''}`}
          >
            <FaRedo className="text-xl" />
          </button>
        </div>
      </div>

      {/* Seek Bar */}
      <div className="flex flex-col items-center w-full space-y-2">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 w-full">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to format time
const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default Player;
