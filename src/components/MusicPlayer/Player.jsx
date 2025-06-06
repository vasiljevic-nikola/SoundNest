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

  console.log("Player rendering with:", {
    activeSong,
    isPlaying,
    audioSrc:
      activeSong?.attributes?.previews?.[0]?.url ||
      activeSong?.hub?.actions?.[1]?.uri ||
      "",
  });

  useEffect(() => {
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

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  // Pristup audio URL-u na više načina
  const audioSrc =
    activeSong?.attributes?.previews?.[0]?.url ||
    activeSong?.hub?.actions?.[1]?.uri ||
    "";

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
