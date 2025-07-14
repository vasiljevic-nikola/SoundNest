import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => {
  // --- Data Normalization ---
  const songTitle =
    activeSong?.attributes?.name || activeSong?.title || "No active Song";
  const artistName =
    activeSong?.attributes?.artistName ||
    activeSong?.subtitle ||
    "No active Artist";

  // --- Image URL Processing ---
  // Get the base image URL from either of the two possible object structures.
  const baseImageUrl =
    activeSong?.attributes?.artwork?.url ||
    activeSong?.images?.coverart ||
    activeSong?.images?.default;

  const imageUrl = baseImageUrl
    ? baseImageUrl.replace("{w}", "125").replace("{h}", "125")
    : "";

  return (
    <div className="flex-1 flex items-center justify-start">
      {/* --- Spinning Artwork --- */}
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={imageUrl}
          alt="cover art"
          className="rounded-full"
          // Fallback to a default image if the song's artwork fails to load
          onError={(e) => {
            e.currentTarget.src = "/default-image.png";
          }}
        />
      </div>

      {/* --- Song Title and Artist Name --- */}
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">{songTitle}</p>
        <p className="truncate text-gray-300">{artistName}</p>
      </div>
    </div>
  );
};

export default Track;
