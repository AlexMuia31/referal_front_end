/* eslint import/no-anonymous-default-export: [2, {allowObject: true}] */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://referal-huy5.onrender.com";

export const ReferralApi = createApi({
  reducerPath: "referralApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users/",
    }),
    createUsers: builder.mutation({
      query: (body) => ({
        url: "/users/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUsersMutation } = ReferralApi;
