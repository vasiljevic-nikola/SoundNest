import React from "react";
import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const isArtist = artistId;

  // Data to display
  // For the artist, the data is inside artistData.attributes
  const name = isArtist
    ? artistData?.attributes?.name
    : songData?.attributes?.name || songData?.title;
  const artistName = isArtist
    ? null
    : songData?.attributes?.artistName || songData?.subtitle;
  const genre = isArtist ? null : songData?.attributes?.genreNames?.[0];
  const releaseDate = isArtist ? null : songData?.attributes?.releaseDate;

  // Image
  // For the artist, the image is artistData.attributes.artwork.url
  const artworkUrl = isArtist
    ? artistData?.attributes?.artwork?.url
    : songData?.attributes?.artwork?.url || songData?.images?.coverart;

  const getImageUrl = (url, size = 400) => {
    if (url) {
      // The Shazam API for artist artwork has a {w}x{h} placeholder
      if (url.includes("{w}") && url.includes("{h}")) {
        return url.replace("{w}", size).replace("{h}", size);
      }
      return url;
    }
    return "/default-image.png";
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-tl from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={getImageUrl(artworkUrl, 800)}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "/default-image.png";
          }}
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">{name}</p>

          {!isArtist && (
            <Link
              to={`/artists/${songData?.relationships?.artists?.data?.[0]?.id}`}
            >
              <p className="text-base text-gray-400 mt-2">{artistName}</p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {isArtist
              ? artistData?.attributes?.genreNames?.[0] || "Artist"
              : `${
                  releaseDate ? new Date(releaseDate).getFullYear() : "N/A"
                } • ${genre || "N/A"}`}
          </p>
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
