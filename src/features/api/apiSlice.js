import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    //const token = getState().auth.token;
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJleHAiOjE2NzIzNTI2ODcsInVzZXJuYW1lIjoiVGVzdCJ9.fsMvIZ7FDkmRBLBI2LmBYZzZ8wfcz_gtKbCyqJ7DZ24";

    console.log(token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/refreshToken",
        method: "POST",
        body: {
          name: "Test",
          age: 45,
          job: "test",
          pet: "test",
          date: "2022-12-06T12:32",
          role: {
            name: "doctor",
          },
        },
      },
      api,
      extraOptions
    );
    console.log("data");
    console.log(refreshResult.data);
    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
      console.log("result");
      console.log(result);
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
