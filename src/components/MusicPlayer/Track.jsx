import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => {
  console.log("Track component rendering with activeSong:", activeSong);

  // Pristup slici na više načina
  const coverArt =
    activeSong?.attributes?.artwork?.url ||
    activeSong?.images?.coverart ||
    activeSong?.album?.images?.[0]?.url ||
    "/default-image.jpg";

  // Pristup nazivu pesme na više načina
  const songTitle =
    activeSong?.attributes?.name || activeSong?.title || "No active Song";

  // Pristup imenu izvođača na više načina
  const artistName =
    activeSong?.attributes?.artistName ||
    activeSong?.subtitle ||
    "No active Artist";

  return (
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img src={coverArt} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">{songTitle}</p>
        <p className="truncate text-gray-300">{artistName}</p>
      </div>
    </div>
  );
};

export default Track;
