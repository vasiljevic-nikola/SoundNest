import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

// Redux slice hooks
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { Loader, Error } from "./";

import "swiper/css";
import "swiper/css/free-mode";

// Helper to format image URLs (especially with {w} and {h} placeholders)
const getImageUrl = (song, size = 400) => {
  const imageUrl = song.attributes?.artwork?.url;
  if (imageUrl) {
    return imageUrl.replace("{w}", size).replace("{h}", size);
  }
  return "/default-image.png";
};

// Card representing a single top chart entry
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      {/* Song ranking number */}
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      {/* Cover art + title and artist */}
      <div className="flex-1 flex flex-row justify-between items-center">
        {/* Album image + play overlay */}
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

        {/* Title and artist */}
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`}>
            <p className="text-xl font-bold text-white line-clamp-1">
              {song?.attributes?.name}
            </p>
          </Link>

          {song?.relationships?.artists?.data?.[0]?.id ? (
            <Link
              to={`/artists/${song?.relationships?.artists?.data?.[0]?.id}`}
            >
              <p className="text-base text-gray-300 mt-1 line-clamp-1">
                {song?.attributes?.artistName}
              </p>
            </Link>
          ) : (
            <p className="text-base text-gray-300 mt-1 line-clamp-1">
              {song?.attributes?.artistName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main component rendering top charts and top artists carousel
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  console.log("Pokretanje useGetTopChartsQuery() hook...");
  const { data, isFetching, error } = useGetTopChartsQuery(10);
  console.log("data:", data);
  console.log("isFetching:", isFetching);
  console.log("error:", error);

  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const topPlays = data && data.slice ? data.slice(0, 5) : [];

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: topPlays, i }));
    dispatch(playPause(true));
  };

  if (isFetching) {
    console.log("Loading...");
    return <Loader title="Loading Top Charts..." />;
  }
  if (error) {
    console.log("Greška pri dohvatu podataka:", error);
    return <Error />;
  }

  if (!data || data.length === 0) {
    console.log("Nema podataka ili data je prazno");
    return <Loader title="No Top Charts available." />;
  }

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      {/* TOP CHARTS */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1 max-h-[300px] overflow-y-scroll pr-2 hide-scrollbar">
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

      {/* TOP ARTISTS */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        {/* Swiper carousel for top artist images */}
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
                    e.currentTarget.src = "/default-artist.png";
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
