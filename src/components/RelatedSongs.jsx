import React from "react";
import SongCard from "./SongCard";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  console.log("RelatedSongs - data prop:", data);

  return (
    <div className="flex flex-col">
      {/* Header for the related songs section */}
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="mt-6 w-full flex flex-col">
        {/* Map through each related song and render a SongCard */}
        {data?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
