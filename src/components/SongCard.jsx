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

  // --- Event Handlers ---
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(song));
  };

  // --- Data Normalization & Helpers ---
  // These variables ensure the component can correctly display data
  // regardless of the song object's structure (from charts vs. search).
  const songTitle = song.attributes?.name || song.title || "Unknown Song";
  const artistName =
    song.attributes?.artistName || song.subtitle || "Unknown Artist";
  const artistId =
    song.relationships?.artists?.data?.[0]?.id || song.artists?.[0]?.adamid;
  const songId = song.id || song.key;

  // Check if the current song is in the favorites list.
  const isFavorite = favorites.some(
    (favSong) => (favSong.id || favSong.key) === songId
  );

  // Helper function to get the correct image URL and handle fallbacks.
  const getImageUrl = (song, size = 400) => {
    const imageUrl =
      song.attributes?.artwork?.url ||
      song.images?.default ||
      song.images?.coverart;
    if (imageUrl) {
      // Replace placeholders for desired image size.
      return imageUrl.replace("{w}", size).replace("{h}", size);
    }
    return "/default-image.png"; // Fallback image
  };

  return (
    <div
      className="relative group flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup
rounded-lg cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
    >
      {/* --- Artwork and Overlay --- */}
      <div className="relative w-full h-56">
        <div
          className={`absolute inset-0 justify-center items-center bg-opacity-300 transition-opacity duration-300
      ${
        // Show overlay if the song is the currently active one.
        (activeSong?.id || activeSong?.key) === songId
          ? " shadow-lg group-hover:bg-black/30"
          : "bg-opacity-50"
      } `}
        >
          {/* Favorite (Heart) Button */}
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

          {/* Play/Pause Button Overlay */}
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        {/* Song Cover Image */}
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

      {/* --- Song and Artist Info --- */}
      <div className="mt-4 flex flex-col">
        {/* Song Title (No longer a link) */}
        <p className="text-lg font-semibold truncate text-white">{songTitle}</p>
        {/* Artist Name (Links to artist details page) */}
        <p className="text-sm truncate text-gray-300 mt-1">
          {artistId ? (
            <Link
              to={`/artists/${artistId}`}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {artistName}
            </Link>
          ) : (
            <span className="text-base text-gray-300 mt-1 line-clamp-1">
              {artistName}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
