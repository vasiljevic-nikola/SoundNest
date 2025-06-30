import React from "react";

// Function to get image URL with {w} and {h} replaced
const getImageUrl = (song, size = 400) => {
  const imageUrl = song?.attributes?.artwork?.url;
  if (imageUrl) {
    return imageUrl.replace("{w}", size).replace("{h}", size);
  }
  return "/default-image.png";
};

const Track = ({ isPlaying, isActive, activeSong }) => {
  console.log("Track component rendering with activeSong:", activeSong);

  // Image access
  const coverArt = activeSong?.attributes?.artwork?.url
    ? getImageUrl(activeSong, 400)
    : "/default-image.png"; // Fallback to default image

  // Access song title
  const songTitle =
    activeSong?.attributes?.name || activeSong?.title || "No active Song";

  // Artist name access
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
