import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => (
  <div className="relative group flex justify-center items-center w-full h-full">
    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle
          size={35}
          className="text-gray-300"
          onClick={handlePause}
        />
      ) : (
        <FaPlayCircle
          size={35}
          className="text-gray-300"
          onClick={handlePlay}
        />
      )}
    </div>
  </div>
);
export default PlayPause;
