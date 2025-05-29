import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  //const { activeSong } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="relative group flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup
rounded-lg cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
    >
      <div className="relative w-full h-56">
        <div
          className={`absolute inset-0 justify-center items-center bg-opacity-300 transition-opacity duration-300
      ${
        activeSong?.title === song.title
          ? " shadow-lg group-hover:bg-black/30"
          : "bg-opacity-50"
      } `}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.attributes.artwork?.url ?? "/default-image.jpg"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="text-lg font-semibold truncate text-white">
          <Link
            to={`/song/${song.id}`}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            {String(song.attributes.name ?? "Unknown Song")}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={`/artist/${song.attributes.artistName}`}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            {String(song.attributes.artistName)}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
