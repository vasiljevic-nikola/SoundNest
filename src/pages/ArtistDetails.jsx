import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: errorArtistDetails,
  } = useGetArtistDetailsQuery(artistId);
  const {
    data: artistTopSongs,
    isFetching: isFetchingArtistTopSongs,
    error: errorArtistTopSongs,
  } = useGetArtistTopSongsQuery(artistId);

  console.log("ArtistDetails - artistId:", artistId);
  console.log("ArtistDetails - artistData:", artistData);
  console.log("ArtistDetails - artistTopSongs:", artistTopSongs);
  console.log(
    "ArtistDetails - isFetchingArtistDetails:",
    isFetchingArtistDetails
  );
  console.log(
    "ArtistDetails - isFetchingArtistTopSongs:",
    isFetchingArtistTopSongs
  );

  if (isFetchingArtistDetails || isFetchingArtistTopSongs)
    return <Loader title="Loading artist details..." />;
  if (errorArtistDetails || errorArtistTopSongs)
    return <Error title="Failed to load artist details." />;

  if (!artistData) return <Error title="Artist details not found." />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: artistTopSongs, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
        songData={null}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Top Songs by {artistData.attributes?.name || artistData.name}:
        </h2>
        <div className="mt-5">
          {artistTopSongs && artistTopSongs.length > 0 ? (
            <RelatedSongs
              data={artistTopSongs}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ) : (
            <p className="text-gray-400 text-base my-1">
              No top songs found for this artist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
