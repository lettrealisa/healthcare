import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    /*prepareHeaders: (headers) => {
      const token = store.getState().auth;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },*/
  }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => "/foods",
    }),
    getAlcohol: builder.query({
      query: () => "/alcohol",
    }),
    getGlucose: builder.query({
      query: () => "/glucose",
    }),
    login: builder.mutation({
      query: (body) => ({ url: "/login", method: "POST", body: body }),
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetAlcoholQuery,
  useGetGlucoseQuery,
  useLoginMutation,
} = apiSlice;
