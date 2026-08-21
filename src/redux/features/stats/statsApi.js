import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/stats`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Stats", "Orders"],
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => "/stats",
      providesTags: ["Stats"],
    }),

    getAdminStats: builder.query({
      query: () => "/stats/admin-stats",
      providesTags: ["Stats"],
    }),

    getUserStats: builder.query({
      query: (email) => `/stats/user-stats/${email}`,
      providesTags: ["Stats"],
    }),

    getOrdersByEmail: builder.query({
      query: (email) => `/orders/user/${email}`,
      providesTags: ["Orders"],
    }),

    updateStats: builder.mutation({
      query: (data) => ({
        url: "/stats",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetAdminStatsQuery,
  useGetUserStatsQuery,
  useGetOrdersByEmailQuery,
  useUpdateStatsMutation,
} = statsApi;

export default statsApi;
