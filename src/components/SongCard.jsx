import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i }) => {
  //const activeSong = "Test";
  const { activeSong } = useSelector((state) => state.player);

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
          <PlayPause />
        </div>
        <img
          alt="song_img"
          src={song.attributes.artwork?.url ?? "/default-image.jpg"}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default SongCard;
