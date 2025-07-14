import React from "react";

// Seekbar component allows users to track and control audio playback position
const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // Converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  console.log("Rendering SeekBar with values:", { value, min, max, appTime });

  return (
    <div className="flex flex-row items-center w-full justify-between">
      {/* Skip backward 5 seconds */}
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        className="hidden lg:mr-4 lg:block text-white"
      >
        -
      </button>
      {/* Current time display */}
      <p className="text-white text-sm sm:text-base">
        {value === 0 ? "0:00" : getTime(value)}
      </p>
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
          borderRadius: "5px",
          height: "5px",
          outline: "none",
          margin: "0",
          padding: "0",
          border: "none",
          boxShadow: "none",
        }}
        className="flex-grow h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      {/* Total duration display */}
      <p className="text-white text-sm sm:text-base">
        {max === 0 ? "0:00" : getTime(max)}
      </p>
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
