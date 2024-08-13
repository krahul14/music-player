import React from "react"
import musicData from "../data/musicData" // Adjust the path according to your project structure
import { PlayIcon, PauseIcon, PlusIcon } from "@heroicons/react/24/outline" // Ensure Heroicons is installed
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const MusicList = ({
  playlist,
  setPlaylist,
  currentSong,
  isPlaying,
  onPlayPause,
}) => {
  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song])
    toast.success("Song added to your playlist")
  }

  const handleOptionClick = (song, action) => {
    if (action === "add") {
      addToPlaylist(song)
    } else if (action === "play") {
      onPlayPause(song) // Trigger the play action
    }
  }

  const isSongPlaying = (song) => currentSong === song && isPlaying

  return (
    <>
      <ToastContainer />
      <div className="font-bold text-[30px] p-4">All Songs</div>
      <hr className="border border-blue-500" />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {musicData.map((song, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
          >
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
                  onClick={() => handleOptionClick(song, "add")}
                  title="Add to Playlist"
                >
                  <PlusIcon className="w-6 h-6 " />
                </button>
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleOptionClick(song, "play")}
                  title="Play"
                >
                  {isSongPlaying(song) ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MusicList
