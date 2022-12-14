import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: () => "/foods",
    }),
    getAlcohol: builder.query({
      query: () => "/alcohol",
    }),
  }),
});

export const { useGetFoodsQuery, useGetAlcoholQuery } = apiSlice;
