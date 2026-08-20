import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const heroBannerApi = createApi({
  reducerPath: "heroBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/hero-banner`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const stateToken = getState()?.auth?.token;
      const localToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const token = stateToken || localToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["HeroBanner"],
  endpoints: (builder) => ({
    // ১. হিরো ব্যানার ফেচ করা
    getHeroBanner: builder.query({
      query: () => "/",
      transformResponse: (response) => {
        return response?.data || response;
      },
      providesTags: [{ type: "HeroBanner", id: "DATA" }],
    }),

    // ২. হিরো ব্যানার তৈরি করা (POST)
    addHeroBanner: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData, // FormData সরাসরি যাবে
      }),
      invalidatesTags: [{ type: "HeroBanner", id: "DATA" }],
    }),

    // ৩. হিরো ব্যানার আপডেট করা (PUT)
    updateHeroBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData, // FormData সরাসরি যাবে
      }),
      invalidatesTags: [{ type: "HeroBanner", id: "DATA" }],
    }),

    // ৪. হিরো ব্যানার ডিলিট করা (DELETE)
    deleteHeroBanner: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "HeroBanner", id: "DATA" }],
    }),
  }),
});

export const {
  useGetHeroBannerQuery,
  useAddHeroBannerMutation,
  useUpdateHeroBannerMutation,
  useDeleteHeroBannerMutation,
} = heroBannerApi;

export default heroBannerApi;