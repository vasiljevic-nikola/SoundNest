import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core7.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "a635827a65mshb2c4434ade8ce84p15c5fejsn291fb20129ed"
      );
      headers.set("x-rapidapi-host", "shazam-core7.p.rapidapi.com");
      return headers;
    },
  }),

  // Gets a list of top global songs
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (limit = 30) => `/charts/get-top-songs-in-world?limit=${limit}`,
      transformResponse: (response) => {
        return response?.data || [];
      },
    }),

    // Gets songs by genre name
    getSongsByGenre: builder.query({
      query: (genre) =>
        `/charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=30`,
      transformResponse: (response) => {
        console.log("shazamCore.js - Raw Genre API Response:", response);
        return response?.data || [];
      },
    }),

    // Searches for songs
    getSongsBySearch: builder.query({
      query: (searchTerm) => {
        const url = searchTerm
          ? `/search?term=${encodeURIComponent(searchTerm)}&limit=10`
          : null;
        console.log("shazamCore.js - Search URL:", url);
        return url;
      },

      transformResponse: (response) => {
        console.log("shazamCore.js - Raw Search API Response:", response);
        // Normalizes structure of songs from search API
        const rawHits = response?.data?.tracks?.hits || [];
        const transformedSongs = rawHits.map((hit) => {
          const song = hit;
          return {
            id: song.key,
            type: song.type,
            attributes: {
              name: song.heading?.title || song.alias,
              artistName: song.heading?.subtitle,
              artwork: {
                url: song.images?.default || song.images?.play,
              },
              previews: song.stores?.apple?.previewurl
                ? [{ url: song.stores.apple.previewurl }]
                : [],
            },
            share: song.share,
            stores: song.stores,
            url: song.url,
          };
        });
        console.log(
          "shazamCore.js - Transformed Search Songs:",
          transformedSongs
        );
        return transformedSongs;
      },
    }),
    getTopArtistsFromCharts: builder.query({
      query: (limit = 50) => `/charts/get-top-songs-in-world?limit=${limit}`,
      transformResponse: (response) => {
        const songs = response?.data || [];
        const artists = {};
        songs.forEach((song) => {
          if (song.relationships?.artists?.data?.length > 0) {
            const artist = song.attributes?.artistName;
            const artistId = song.relationships.artists.data[0].id;
            if (!artists[artistId]) {
              artists[artistId] = {
                id: artistId,
                name: artist,
                artwork: song.attributes?.artwork?.url,
                url: song.relationships.artists.data[0].href,
              };
            }
          }
        });
        return Object.values(artists);
      },
    }),
    // Fetch detailed song info by song ID
    getSongDetails: builder.query({
      query: (songid) => `/songs/get_details?id=${songid}`,
      transformResponse: (response) => {
        console.log("shazamCore.js - Raw Song Details API Response:", response);
        return response || null;
      },
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artist/get-details?id=${artistId}`,
      transformResponse: (response) => {
        console.log(
          "shazamCore.js - Raw Artist Details API Response:",
          response
        );
        return response?.data?.[0] || null;
      },
    }),

    getArtistTopSongs: builder.query({
      query: (artistId) => `/artist/get-top-songs?id=${artistId}&offset=0`,
      transformResponse: (response) => {
        console.log(
          "shazamCore.js - Raw Artist Top Songs API Response:",
          response
        );
        const rawSongs = response?.data || [];

        return rawSongs;
      },
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetTopArtistsFromChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} = shazamCoreApi;
