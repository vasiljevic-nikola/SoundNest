import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Error, Loader } from "../components";
import { useGetTopArtistsFromChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {
  // Fetch top 50 artists from Shazam API
  const { data, isFetching, error } = useGetTopArtistsFromChartsQuery(50);

  if (isFetching) return <Loader title="Loading Top Artists..." />;
  if (error) return <Error title="Failed to load Top Artists." />;

  // Helper to resolve artist image URL (handles {w} and {h} replacements)
  const getArtistImageUrl = (artist, size = 400) => {
    if (artist.artwork) {
      return artist.artwork.replace("{w}", size).replace("{h}", size);
    }
    return "/default-artist.png";
  };

  return (
    <div className="flex flex-col p-4">
      {/* Section header */}
      <h2 className="font-bold text-3xl text-white mb-10">
        Global Top Artists
      </h2>

      {/* Artist grid */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((artist) => (
          <Link
            key={artist.id}
            to={`/artists/${artist.id}`}
            className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
          >
            {/* Artist cover image */}
            <img
              src={getArtistImageUrl(artist, 400)}
              alt={artist.name}
              className="w-full h-56 rounded-lg object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "/default-artist.png";
              }}
            />
            {/* Artist name */}
            <p className="mt-4 text-lg font-semibold truncate text-white">
              {artist.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
