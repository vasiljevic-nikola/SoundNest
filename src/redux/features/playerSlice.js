import { createSlice } from "@reduxjs/toolkit";

// Load favorites from localStorage on app start
const loadFavoritesFromLocalStorage = () => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);
    return [];
  }
};

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "", // Početna vrednost je prazan string za "All Genres"
  favorites: loadFavoritesFromLocalStorage(),
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Activates selected song and resolves song list from various structures
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      let songsArray = [];

      // Resolve song list depending on API response shape
      if (action.payload.data && Array.isArray(action.payload.data.data)) {
        songsArray = action.payload.data.data;
      } else if (Array.isArray(action.payload.data)) {
        songsArray = action.payload.data;
      } else if (
        action.payload.data?.tracks?.hits &&
        Array.isArray(action.payload.data.tracks.hits)
      ) {
        songsArray = action.payload.data.tracks.hits.map((hit) => hit.track);
      } else if (
        action.payload.data?.tracks &&
        Array.isArray(action.payload.data.tracks)
      ) {
        songsArray = action.payload.data.tracks;
      } else if (
        action.payload.data?.properties?.tracks &&
        Array.isArray(action.payload.data.properties.tracks)
      ) {
        songsArray = action.payload.data.properties.tracks;
      }
      state.currentSongs = songsArray;
      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    // Moves to the next song
    nextSong: (state, action) => {
      state.activeSong = state.currentSongs[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    // Moves to the previous song
    prevSong: (state, action) => {
      state.activeSong = state.currentSongs[action.payload];
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    // Set selected genre filter
    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },

    // Reset genre filter to "All Genres"
    resetToAllGenres: (state) => {
      state.genreListId = "";
    },

    // Deactivate current song and stop playback
    deactivateSong: (state) => {
      state.isActive = false;
      state.isPlaying = false;
    },

    toggleFavorite: (state, action) => {
      const songToAdd = action.payload;
      const isAlreadyFavorite = state.favorites.some(
        (favSong) => favSong.id === songToAdd.id
      );

      if (isAlreadyFavorite) {
        state.favorites = state.favorites.filter(
          (favSong) => favSong.id !== songToAdd.id
        );
      } else {
        state.favorites.push(songToAdd);
      }

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
  resetToAllGenres,
  deactivateSong,
  toggleFavorite,
} = playerSlice.actions;

export default playerSlice.reducer;
