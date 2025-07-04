import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";
import "./index.css";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeSong, isActive } = useSelector((state) => state.player);

  console.log("App rendering - isActive:", isActive, "activeSong:", activeSong);

  return (
    <div className="relative flex">
      {/* Sidebar (desktop & mobile controlled) */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        {/* Mobile menu toggle button (hamburger icon) */}
        <div className="absolute md:hidden top-6 right-3">
          <HiOutlineMenu
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
        {/* Main page layout: Routes on left, TopPlay on right */}
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>

          {/* Sticky TopPlay sidebar on larger screens */}
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {isActive && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
