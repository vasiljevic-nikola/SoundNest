import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// --- Helper Functions ---
const getImageUrl = (song, size = 400) => {
  const imageUrl = song.attributes?.artwork?.url;
  if (imageUrl) {
    return imageUrl.replace("{w}", size).replace("{h}", size);
  }
  return "/default-image.png";
};

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <div className="relative w-20 h-20">
        <img
          className="w-full h-full rounded-lg object-cover"
          src={getImageUrl(song, 400)}
          alt={song?.attributes?.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "/default-image.png";
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-40 rounded-lg transition">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center mx-3">
        {/* Song Title (No longer a link) */}
        <p className="text-xl font-bold text-white line-clamp-1">
          {song?.attributes?.name}
        </p>
        {/* Artist Name (Links to artist details page) */}
        <Link to={`/artists/${song?.relationships?.artists?.data?.[0]?.id}`}>
          <p className="text-base text-gray-300 mt-1 line-clamp-1">
            {song?.attributes?.artistName}
          </p>
        </Link>
      </div>
    </div>
  </div>
);

const TopPlay = () => {
  // --- Redux & State Hooks ---
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery(10);
  const divRef = useRef(null);

  // --- Effects ---
  // Scrolls the component into view on initial render.
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // --- Data & Event Handlers ---
  const topPlays = data && data.slice ? data.slice(0, 5) : [];

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: topPlays, i }));
    dispatch(playPause(true));
  };

  // --- Render Logic ---
  // Don't render anything while fetching or if an error occurs.
  if (isFetching || error) return null;

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col pr-6"
    >
      {/* --- TOP CHARTS Section --- */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        {/* This container has a max height and will scroll if content overflows. */}
        <div className="mt-4 flex flex-col gap-1 max-h-[40vh] overflow-y-auto hide-scrollbar">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song?.id || i}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      {/* --- TOP ARTISTS Section --- */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        {/* Swiper component for the artist carousel */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.relationships?.artists?.data?.[0]?.id || `artist-${i}`}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link
                to={`/artists/${song?.relationships?.artists?.data?.[0]?.id}`}
              >
                <img
                  src={getImageUrl(song, 400)}
                  alt={song?.attributes?.name}
                  className="rounded-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/default-image.png";
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
