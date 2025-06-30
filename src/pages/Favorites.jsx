import React from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";

const Favorites = () => {
  const { activeSong, isPlaying, favorites } = useSelector(
    (state) => state.player
  );

  // If there are no favorite songs, show a message
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col p-4">
        <h2 className="font-bold text-3xl text-white mb-10">Your Favorites</h2>
        <p className="text-white text-xl text-center mt-10">
          You haven't added any songs to your favorites yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <h2 className="font-bold text-3xl text-white mb-10">Your Favorites</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {favorites.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={favorites}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
