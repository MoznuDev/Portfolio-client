import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";


const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api`, // baseUrl '/api' রাখা ভালো যাতে stats ও orders দুটোতেই কাজ করে
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
    // ১. পাবলিক পোর্টফোলিও স্ট্যাটস
    getStats: builder.query({
      query: () => "/stats",
      providesTags: ["Stats"],
    }),

    // ২. অ্যাডমিন ড্যাশবোর্ড স্ট্যাটস
    getAdminStats: builder.query({
      query: () => "/stats/admin-stats",
      providesTags: ["Stats"],
    }),

    // ৩. ইউজার ড্যাশবোর্ড স্ট্যাটস
    getUserStats: builder.query({
      query: (email) => `/stats/user-stats/${email}`,
      providesTags: ["Stats"],
    }),

    // ৪. ইউজার অর্ডারসমূহ পাওয়ার এন্ডপয়েন্ট (এটি যুক্ত করা হলো)
    getOrdersByEmail: builder.query({
      query: (email) => `/orders/user/${email}`, // আপনার ব্যাকএন্ড রাউট অনুযায়ী অ্যাডজাস্ট করুন
      providesTags: ["Orders"],
    }),

    // ৫. স্ট্যাটস আপডেট
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

// হুক এক্সপোর্ট করুন
export const {
  useGetStatsQuery,
  useGetAdminStatsQuery,
  useGetUserStatsQuery,
  useGetOrdersByEmailQuery, // এখন এটি সঠিকভাবে কাজ করবে
  useUpdateStatsMutation,
} = statsApi;

export default statsApi;