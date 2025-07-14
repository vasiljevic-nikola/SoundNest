import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API slice using Redux Toolkit Query
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core7.p.rapidapi.com",
    // Prepare headers to include the API key before each request
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "a635827a65mshb2c4434ade8ce84p15c5fejsn291fb20129ed"
      );
      headers.set("x-rapidapi-host", "shazam-core7.p.rapidapi.com");
      return headers;
    },
  }),

  // Define the API endpoints
  endpoints: (builder) => ({
    // Endpoint to get top charts
    getTopCharts: builder.query({
      query: (limit = 30) => `/charts/get-top-songs-in-world?limit=${limit}`,
      // Transform the response to ensure we always return an array
      transformResponse: (response) => response?.data || [],
    }),

    // Endpoint to get songs by a specific genre
    getSongsByGenre: builder.query({
      query: (genre) =>
        `/charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=30`,
      transformResponse: (response) => response?.data || [],
    }),

    // Endpoint to search for songs
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search?term=${encodeURIComponent(searchTerm)}&limit=10`,
      // Transform the search results into a consistent song object structure
      transformResponse: (response) => {
        const rawHits = response?.data?.tracks?.hits || [];
        return rawHits.map((hit) => {
          const song = hit;
          return {
            id: song.key,
            key: song.key,
            title: song.heading?.title || song.alias,
            subtitle: song.heading?.subtitle,
            images: song.images,
            artists: song.artists,
            stores: song.stores,
          };
        });
      },
    }),

    // Endpoint to get a list of top artists (derived from top charts)
    getTopArtistsFromCharts: builder.query({
      query: (limit = 50) => `/charts/get-top-songs-in-world?limit=${limit}`,
      // Transform the list of songs into a unique list of artists
      transformResponse: (response) => {
        const songs = response?.data || [];
        const artists = {};
        songs.forEach((song) => {
          if (song.relationships?.artists?.data?.length > 0) {
            const artistId = song.relationships.artists.data[0].id;
            const artistName = song.attributes?.artistName;
            if (!artists[artistId]) {
              artists[artistId] = {
                id: artistId,
                name: artistName,
                artwork: song.attributes?.artwork?.url,
              };
            }
          }
        });
        return Object.values(artists);
      },
    }),

    // Endpoint to get details for a specific artist
    getArtistDetails: builder.query({
      query: (artistId) => `/artist/get-details?id=${artistId}`,
      transformResponse: (response) => response?.data?.[0] || null,
    }),

    // Endpoint to get the top songs for a specific artist
    getArtistTopSongs: builder.query({
      query: (artistId) => `/artist/get-top-songs?id=${artistId}&offset=0`,
      transformResponse: (response) => response?.data || [],
    }),
  }),
});

// Export the auto-generated hooks for each endpoint
export const {
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetTopArtistsFromChartsQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} = shazamCoreApi;
