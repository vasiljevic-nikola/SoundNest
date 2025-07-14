import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

// Functional component that renders playback controls
const Controls = ({
  isPlaying,
  isActive, // isActive prop is not used in this component, consider removing if not needed
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs, // currentSongs prop is not used in this component, consider removing if not needed
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) => {
  console.log("Controls rendering with currentSongs:", currentSongs);

  return (
    <div className="flex flex-row items-center justify-around gap-4 w-full">
      {/* Repeat button: turns red when active */}
      <BsArrowRepeat
        size={20}
        color={repeat ? "red" : "white"}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
      {/* Previous track button */}
      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevSong}
      />
      {/* Conditional rendering: shows pause or play button based on playback state */}
      {isPlaying ? (
        <BsFillPauseFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      )}
      {/* Next track button */}
      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextSong}
      />
      {/* Shuffle button: turns red when active */}
      <BsShuffle
        size={20}
        color={shuffle ? "red" : "white"}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  );
};
export default Controls;
