/* eslint import/no-anonymous-default-export: [2, {allowObject: true}] */

import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { ReferralApi } from "./services";

export const store = configureStore({
  reducer: {
    [ReferralApi.reducerPath]: ReferralApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReferralApi.middleware),
});

setupListeners(store.dispatch);
