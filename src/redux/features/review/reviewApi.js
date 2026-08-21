import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/reviews`, // নোট: ব্যাকএন্ড রাউটের সাথে মিলিয়ে /api/reviews ব্যবহার করা ভালো
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
                type: "Reviews",
                id: _id || id,
              })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }];
      },
    }),

    // ২. শুধুমাত্র ফিচার্ড (Featured) রিভিউসমূহ পাওয়া (Home page testimonials-এর জন্য)
    getFeaturedReviews: builder.query({
      query: () => "/featured",
      providesTags: [{ type: "Reviews", id: "FEATURED" }],
    }),

    // ৩. নতুন রিভিউ পোস্ট করা (Single or Bulk)
    postAReview: builder.mutation({
      query: (reviewData) => ({
        url: "/create-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: [{ type: "Reviews", id: "LIST" }, { type: "Reviews", id: "FEATURED" }],
    }),

    // ৪. রিভিউ আপডেট বা Toggle Featured করা
    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PUT",
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