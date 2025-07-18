import React from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

// VolumeBar component
const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      {/* Display "high volume" icon and mute on click */}
      {value <= 1 && value > 0.5 && (
        <BsFillVolumeUpFill
          size={25}
          color="#FFF"
          onClick={() => setVolume(0)}
        />
      )}
      {/* Display "low volume" icon and mute on click */}
      {value <= 0.5 && value > 0 && (
        <BsVolumeDownFill size={25} color="#FFF" onClick={() => setVolume(0)} />
      )}
      {/* Display "muted" icon and reset volume to max on click */}
      {value === 0 && (
        <BsFillVolumeMuteFill
          size={25}
          color="#FFF"
          onClick={() => setVolume(1)}
        />
      )}
      {/* Slider input to control volume value */}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          borderRadius: "5px",
          height: "5px",
          outline: "none",
          margin: "0",
          padding: "0",
          border: "none",
          boxShadow: "none",
        }}
        className="w-24 lg:w-32 h-1 ml-2"
      />
    </div>
  );
};

export default VolumeBar;
