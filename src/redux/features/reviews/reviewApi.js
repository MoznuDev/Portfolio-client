import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl().replace(/\/$/, "")}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => "/",
      providesTags: ["Reviews"],
    }),

    // ২. একটি নতুন রিভিউ পোস্ট করা
    postAReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),

    // ৩. মোট রিভিউর সংখ্যা পাওয়া
    getReviewsCount: builder.query({
      query: () => "/total-reviews",
    }),

    // ৪. ইউজার আইডি দিয়ে নির্দিষ্ট রিভিউ বের করা
    getReviewByUserId: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Reviews"],
    }),
  }),
});

// হুকস এক্সপোর্ট (useGetReviewsQuery যোগ করা হয়েছে)
export const {
  useGetReviewsQuery, // 👈 এই হুকটি এখন Testimonials.jsx এ কাজ করবে
  useGetReviewByUserIdQuery,
  useGetReviewsCountQuery,
  usePostAReviewMutation,
} = reviewApi;

export default reviewApi;
