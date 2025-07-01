import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import PlayPause from "./PlayPause";
import {
  playPause,
  setActiveSong,
  toggleFavorite,
} from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  // Set song as active and start playback
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    console.log("Setting active song:", JSON.stringify(song, null, 2));
    dispatch(playPause(true));
  };

  // Toggle song in/out of favorites list
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(song));
  };

  // Check if current song is marked as favorite
  const isFavorite = favorites.some((favSong) => favSong.id === song.id);

  // Resolve artwork URL with fallback and dynamic sizing
  const getImageUrl = (song, size = 400) => {
    const imageUrl = song.attributes?.artwork?.url;
    if (imageUrl) {
      return imageUrl.replace("{w}", size).replace("{h}", size);
    }
    return "/default-image.png";
  };

  return (
    <div
      className="relative group flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup
rounded-lg cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
    >
      {/* Cover and overlay with play/pause and heart */}
      <div className="relative w-full h-56">
        <div
          className={`absolute inset-0 justify-center items-center bg-opacity-300 transition-opacity duration-300
      ${
        activeSong?.id === song.id
          ? " shadow-lg group-hover:bg-black/30"
          : "bg-opacity-50"
      } `}
        >
          {/* Heart button */}
          <div
            className="absolute top-3 right-3 z-10"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <AiFillHeart className="text-red-500 text-2xl cursor-pointer" />
            ) : (
              <AiOutlineHeart className="text-white text-2xl cursor-pointer" />
            )}
          </div>

          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        {/* Cover image */}
        <img
          alt="song_img"
          src={getImageUrl(song, 400)}
          className="w-full h-full object-cover rounded-lg"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "/default-image.png";
          }}
        />
      </div>

      {/* Song name and artist */}
      <div className="mt-4 flex flex-col">
        <p className="text-lg font-semibold truncate text-white">
          <Link
            to={`/songs/${song.id}`}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            {String(song.attributes.name ?? "Unknown Song")}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {song?.relationships?.artists?.data?.[0]?.id ? (
            <Link
              to={`/artists/${song?.relationships?.artists?.data?.[0]?.id}`}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {song?.attributes?.artistName}
            </Link>
          ) : (
            <p className="text-base text-gray-300 mt-1 line-clamp-1">
              {song?.attributes?.artistName}
            </p>
          )}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
