import React from "react";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopChartsPage = () => {
  const { data, isFetching, error } = useGetTopChartsQuery(50);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts..." />;
  if (error) return <Error title="Failed to load Top Charts." />;

  return (
    <div className="flex flex-col p-4">
      <h2 className="font-bold text-3xl text-white mb-10">Global Top Charts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopChartsPage;
