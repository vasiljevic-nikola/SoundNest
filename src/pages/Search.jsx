import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();

  console.log("Search.jsx - searchTerm:", searchTerm);

  if (!searchTerm || searchTerm.trim() === "") {
    return (
      <div className="p-4 text-white">
        <h2 className="text-2xl font-bold mb-4">
          Please enter a search term to see results.
        </h2>
      </div>
    );
  }

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm, {
    skip: !searchTerm || searchTerm.trim() === "",
  });

  console.log("Search.jsx - data (after transform):", data);
  console.log("Search.jsx - isFetching:", isFetching);
  console.log("Search.jsx - error:", error);

  if (isFetching) return <Loader title={`Searching "${searchTerm}"...`} />;
  if (error) return <Error />;

  const results = data || [];

  console.log("Search.jsx - results (final):", results);
  console.log("Search.jsx - results.length (final):", results.length);

  return (
    <div className="flex flex-col p-4">
      <h2 className="font-bold text-3xl text-white mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {results.length > 0 ? (
          results.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={results}
              i={i}
            />
          ))
        ) : (
          <p className="text-white">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
