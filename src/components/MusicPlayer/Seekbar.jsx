import React from "react";

// Seekbar component allows users to track and control audio playback position
const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // Converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  console.log("Rendering SeekBar with values:", { value, min, max, appTime });

  return (
    <div className="sm:flex flex-row items-center">
      {/* Skip backward 5 seconds */}
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-4 lg:block text-white"
      >
        -
      </button>
      {/* Current time display */}
      <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
      {/* Main input range for seeking through the track */}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "5px",
          height: "5px",
          outline: "none",
          margin: "0",
          padding: "0",
          border: "none",
          boxShadow: "none",
        }}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      {/* Total duration display */}
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      {/* Skip forward 5 seconds */}
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        className="hidden lg:ml-4 lg:block text-white"
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;
