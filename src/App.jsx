import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// Import components and pages
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  Discover,
  Search,
  TopCharts,
  Favorites,
} from "./pages";
import "./index.css";

const App = () => {
  // Get the active song state from the Redux store to decide if the player should be visible
  const { activeSong, isActive } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      {/* --- Main Layout --- */}
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        {/* This div contains the main scrollable content area and the sticky sidebar */}
        <div className="h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          {/* Left Column: Main Page Content (Discover, Top Charts, etc.) */}
          <div className="flex-1 h-fit pb-40 px-6">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>

          {/* Right Column: TopPlay component (sticky on large screens) */}
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {/* --- Persistent Music Player --- */}
      {/* The player is only rendered at the bottom of the screen if a song is active. */}
      {isActive && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
