import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
} from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";

import { genres } from "../assets/constants";
import { TopPlay } from "../components";

const Discover = () => {
  console.log("Discover render");

  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  // Koristimo useGetTopChartsQuery za početnu stranicu (kada nema odabranog žanra)
  const {
    data: topChartsData,
    isFetching: isTopChartsFetching,
    error: topChartsError,
  } = useGetTopChartsQuery(30, {
    skip: !!genreListId, // Preskačemo ako je odabran žanr
  });

  // Koristimo useGetSongsByGenreQuery kada je odabran specifičan žanr
  const {
    data: genreData,
    isFetching: isGenreFetching,
    error: genreError,
  } = useGetSongsByGenreQuery(genreListId, {
    skip: !genreListId, // Preskačemo ako nije odabran žanr
  });

  // Određujemo koji podaci se koriste
  const data = genreListId ? genreData : topChartsData;
  const isFetching = genreListId ? isGenreFetching : isTopChartsFetching;
  const error = genreListId ? genreError : topChartsError;

  console.log("data:", data);
  console.log("isFetching:", isFetching);
  console.log("error:", error);
  console.log("genreListId:", genreListId);

  // Određujemo naslov stranice
  const getPageTitle = () => {
    if (!genreListId) {
      return "Discover"; // Početna stranica bez žanra
    }
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    return `Discover ${genreTitle}`;
  };

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  const hasResults = data && data.length > 0;

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="flex-1 flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-white text-left">
            {getPageTitle()}
          </h2>

          <select
            onChange={(e) => {
              const selectedValue = e.target.value;
              // Ako je odabrana "All" opcija, resetujemo genreListId
              if (selectedValue === "") {
                dispatch(selectGenreListId(""));
              } else {
                dispatch(selectGenreListId(selectedValue));
              }
            }}
            value={genreListId || ""}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {hasResults ? (
            data
              .slice(0, 30)
              .map((song, i) => (
                <SongCard
                  key={song.id || i}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  i={i}
                />
              ))
          ) : (
            <div className="w-full text-center text-white text-xl mt-10">
              <p>
                {genreListId
                  ? `No songs found for "${
                      genres.find(({ value }) => value === genreListId)?.title
                    }" genre.`
                  : "No songs found."}
              </p>
              <p className="mt-2">
                {genreListId ? (
                  <>
                    Please try another genre or go back to{" "}
                    <span
                      className="text-blue-400 cursor-pointer"
                      onClick={() => dispatch(selectGenreListId(""))}
                    >
                      All Genres
                    </span>
                    .
                  </>
                ) : (
                  "Please try refreshing the page."
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
