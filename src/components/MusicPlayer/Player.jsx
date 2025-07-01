import React, { useRef, useEffect } from "react";

// Player component handles raw audio playback logic
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

  // Access the audio URL in multiple ways
  const audioSrc =
    activeSong?.attributes?.previews?.[0]?.url ||
    activeSong?.hub?.actions?.[1]?.uri ||
    "";

  console.log("Player - activeSong:", JSON.stringify(activeSong, null, 2));
  console.log("Player - audioSrc:", audioSrc);

  // Toggle playback state when isPlaying changes
  useEffect(() => {
    console.log("Player useEffect [isPlaying] - isPlaying:", isPlaying);
    if (ref.current) {
      if (isPlaying) {
        console.log("Attempting to play audio");
        ref.current.play().catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Error playing audio:", err);
          }
        });
      } else {
        console.log("Pausing audio");
        ref.current.pause();
      }
    }
  }, [isPlaying]);

  // Update volume dynamically whenever prop changes
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  // Update playback position (seek) when seekTime changes
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  // Render HTML5 audio element controlled via ref
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
