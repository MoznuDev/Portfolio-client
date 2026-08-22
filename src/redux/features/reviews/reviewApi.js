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
  tagTypes: ["Review"], // ✅ "Review" Singular রাখা হয়েছে যাতে নিচের সব Tag-এর সাথে মেলে
  endpoints: (builder) => ({
    // ১. সকল রিভিউ পাওয়া
    getReviews: builder.query({
      query: () => "/",
      providesTags: (result) => {
        const reviewList = Array.isArray(result)
          ? result
          : result?.reviews || result?.data || [];

        return reviewList.length > 0
          ? [
              ...reviewList.map(({ _id, id }) => ({
                type: "Review",
                id: _id || id,
              })),
              { type: "Review", id: "LIST" },
            ]
          : [{ type: "Review", id: "LIST" }];
      },
    }),

    // ২. শুধুমাত্র ফিচার্ড (Featured) রিভিউসমূহ পাওয়া
    getFeaturedReviews: builder.query({
      query: () => "/featured",
      providesTags: [{ type: "Review", id: "FEATURED" }],
    }),

    // ৩. নতুন রিভিউ পোস্ট করা
    postAReview: builder.mutation({
      query: (reviewData) => ({
        url: "/",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: [
        { type: "Review", id: "LIST" },
        { type: "Review", id: "FEATURED" },
      ],
    }),

    // ৪. রিভিউ আপডেট বা Toggle Featured করা
    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Review", id },
        { type: "Review", id: "LIST" },
        { type: "Review", id: "FEATURED" },
      ],
    }),

    // ৫. রিভিউ ডিলিট করা
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Review", id },
        { type: "Review", id: "LIST" },
        { type: "Review", id: "FEATURED" },
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