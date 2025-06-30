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

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
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

  useEffect(() => {
    if (currentSongs.length) setDuration(currentSongs[currentIndex]?.duration);
  }, [currentSongs, currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }

    setTimeout(() => {
      dispatch(playPause(true));
    }, 100);
  };

  const handlePrevSong = () => {
    // If the current position of the song is more than 3 seconds, go back to the beginning
    if (appTime > 3) {
      setSeekTime(0);
      return;
    }

    dispatch(playPause(false));

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

      <Track
        isPlaying={isPlaying}
        isActive={isActive}
        activeSong={activeSong}
      />
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
