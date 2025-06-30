import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: errorSongDetails,
  } = useGetSongDetailsQuery(songid);

  if (isFetchingSongDetails) return <Loader title="Loading song details..." />;
  if (errorSongDetails) return <Error title="Failed to load song details." />;

  if (!songData) return <Error title="Song details not found." />;

  const lyricsSection = songData.sections?.find((sec) => sec.type === "LYRICS");
  const lyrics = lyricsSection?.text;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: [songData], i: 0 }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      {/* DetailsHeader za pesmu */}
      <DetailsHeader
        artistId={songData.relationships?.artists?.data?.[0]?.id} // Prosleđujemo artistId
        songData={songData}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyrics && lyrics.length > 0 ? (
            lyrics.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>

      {/* RelatedSongs komponenta (za sada prazna ili simulirana) */}
      {/* <RelatedSongs
        data={[]} // Nema povezanih pesama iz ovog API-ja
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}
    </div>
  );
};

export default SongDetails;
