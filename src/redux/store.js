import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamCoreApi } from "./services/shazamCore";

export const store = configureStore({
  reducer: {
    // Inject RTK Query reducer for shazamCore endpoints
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    // Inject custom player slice (playback state, favorites, etc.)
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Extend default middleware with RTK Query middleware for caching, invalidation, etc.
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
