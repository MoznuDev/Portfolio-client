import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/reviews`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // ১. সকল রিভিউ পাওয়া
    getReviews: builder.query({
      query: () => "/",
      providesTags: (result) => {
        const reviewList = Array.isArray(result)
          ? result
          : result?.reviews || result?.data || [];

        return reviewList.length > 0
          ? [
              ...reviewList.map(({ _id, id }) => ({
                type: "Reviews",
                id: _id || id,
              })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }];
      },
    }),

    // ২. শুধুমাত্র ফিচার্ড (Featured) রিভিউসমূহ পাওয়া
    getFeaturedReviews: builder.query({
      query: () => "/featured",
      providesTags: (result) => {
        const featuredList = Array.isArray(result)
          ? result
          : result?.reviews || result?.data || [];

        return featuredList.length > 0
          ? [
              ...featuredList.map(({ _id, id }) => ({
                type: "Reviews",
                id: _id || id,
              })),
              { type: "Reviews", id: "FEATURED" },
            ]
          : [{ type: "Reviews", id: "FEATURED" }];
      },
    }),

    // ৩. নতুন রিভিউ পোস্ট করা
    postAReview: builder.mutation({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: [
        { type: "Reviews", id: "LIST" },
        { type: "Reviews", id: "FEATURED" },
      ],
    }),

    // ৪. রিভিউ আপডেট বা Toggle Featured করা
    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH", // অথবা আপনার ব্যাকএন্ড অনুযায়ী "PUT" রাখুন
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Reviews", id },
        { type: "Reviews", id: "LIST" },
        { type: "Reviews", id: "FEATURED" },
      ],
    }),

    // ৫. রিভিউ ডিলিট করা
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Reviews", id },
        { type: "Reviews", id: "LIST" },
        { type: "Reviews", id: "FEATURED" },
      ],
    }),
  }),
});

// হুকস এক্সপোর্ট
export const {
  useGetReviewsQuery,
  useGetFeaturedReviewsQuery,
  usePostAReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

export default reviewApi;