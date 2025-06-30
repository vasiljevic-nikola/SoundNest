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

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP",
    {
      skip: !genreListId && !genres[0]?.value,
    }
  );

  console.log("data:", data);
  console.log("isFetching:", isFetching);
  console.log("error:", error);

  const genreTitle =
    genres.find(({ value }) => value === genreListId)?.title || "Pop";

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  const hasResults = data && data.length > 0;

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="flex-1 flex flex-col">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
          <h2 className="font-bold text-3xl text-white text-left">
            Discover {genreTitle}
          </h2>

          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId || "POP"}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          >
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
              .slice(0, 50)
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
              <p>No songs found for "{genreTitle}" genre.</p>
              <p className="mt-2">
                Please try another genre or go back to{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => dispatch(selectGenreListId("POP"))}
                >
                  Pop Charts
                </span>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
