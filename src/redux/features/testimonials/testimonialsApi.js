import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const testimonialsApi = createApi({
  reducerPath: "testimonialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/testimonials`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Testimonials"],
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/",
      providesTags: ["Testimonials"],
    }),
    createTestimonial: builder.mutation({
      query: (newTestimonial) => ({
        url: "/create-testimonial",
        method: "POST",
        body: newTestimonial,
      }),
      invalidatesTags: ["Testimonials"],
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Testimonials"],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonials"],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialsApi;

export default testimonialsApi;
