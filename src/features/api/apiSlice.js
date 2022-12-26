import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:8080" });
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(loggedOut())
      console.log("Logged out");
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
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
