import React, { useRef, useEffect } from "react";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const ref = useRef(null);

  const audioSrc =
    activeSong?.attributes?.previews?.[0]?.url ||
    activeSong?.stores?.apple?.previewurl ||
    "";

  // --- Play/Pause Effect ---
  // This effect is triggered whenever the `isPlaying` state or `audioSrc` changes.
  useEffect(() => {
    if (ref.current) {
      if (isPlaying && audioSrc) {
        // If should be playing and a valid source exists, play the audio.
        ref.current.play().catch((err) => {
          // Ignore AbortError which can happen on fast re-renders.
          if (err.name !== "AbortError") {
            console.error("Error playing audio:", err);
          }
        });
      } else {
        // Otherwise, pause the audio.
        ref.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  // --- Volume Control Effect ---
  // Updates the audio element's volume whenever the volume prop changes.
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  // --- Seek/Time Update Effect ---
  // Updates the audio element's current playback time when the user seeks.
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  // --- Render Audio Element ---
  // The actual HTML5 audio tag that plays the music. It's controlled via the `ref`.
  return (
    <audio
      src={audioSrc}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
