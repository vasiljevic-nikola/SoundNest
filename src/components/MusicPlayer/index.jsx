import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import {
  nextSong,
  prevSong,
  playPause,
  deactivateSong,
} from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

// Main music player component
const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  // Local state for duration, seek position, current time, volume, repeat/shuffle modes
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  console.log(
    "MusicPlayer rendering - isActive:",
    isActive,
    "isPlaying:",
    isPlaying
  );

  // Function to close the player
  const handleClosePlayer = () => {
    console.log("Closing player - Button Clicked!");
    dispatch(playPause(false));
    dispatch(deactivateSong());
  };
  // Updates the duration when the current song changes
  useEffect(() => {
    if (currentSongs.length) setDuration(currentSongs[currentIndex]?.duration);
  }, [currentSongs, currentIndex]);

  // Play/pause toggle handler
  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  // Advances to the next track (shuffled or sequential)
  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }

    // Add a short delay before resuming playback
    setTimeout(() => {
      dispatch(playPause(true));
    }, 100);
  };

  // Goes back to the previous track or restarts the current one
  const handlePrevSong = () => {
    // If the current position of the song is more than 3 seconds, go back to the beginning
    if (appTime > 3) {
      setSeekTime(0);
      return;
    }

    dispatch(playPause(false));

    // Handle edge cases: start of playlist or shuffle mode
    if (currentIndex === 0) {
      if (currentSongs?.length) {
        dispatch(prevSong(currentSongs.length - 1));
      }
    } else if (shuffle) {
      if (currentSongs?.length) {
        dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
      }
    } else {
      dispatch(prevSong(currentIndex - 1));
    }

    // A little delay before playing a new song
    setTimeout(() => {
      dispatch(playPause(true));
    }, 100);
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      {/* X button */}
      <button
        onClick={handleClosePlayer}
        className="absolute top-2 right-2 text-white hover:text-gray-300"
      >
        <AiOutlineClose size={20} />
      </button>

      {/* Song thumbnail and info */}
      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
      {/* Central playback controls and seekbar */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>

      {/* Volume control slider */}
      <VolumeBar
        value={volume}
        min="0"
        max="1"
        onChange={(event) => setVolume(event.target.value)}
        setVolume={setVolume}
      />
    </div>
  );
};

export default MusicPlayer;
