import React from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    {/* Song index in list */}
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      {/* Song or artist cover image */}
      <img
        className="w-20 h-20 rounded-lg"
        src={
          artistId
            ? song?.attributes?.artwork?.url
                .replace("{w}", "125")
                .replace("{h}", "125")
            : song?.images?.coverart
        }
        alt={song?.title}
      />

      {/* Song title and artist/album name */}
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">
            {song?.attributes?.name}
          </p>
        )}

        {/* Album name (for artist context) or song subtitle */}
        <p className="text-base text-gray-300 mt-1">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>

    {/* Show PlayPause button only if not in artist context */}
    {!artistId ? (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    ) : null}
  </div>
);

export default SongBar;
