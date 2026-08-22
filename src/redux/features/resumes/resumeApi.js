import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/resumes`, // Plural route convention
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    // ১. সকল রেজুমে/সিভি ডাটা ফেচ করা
    getAllResumes: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id, id }) => ({
                type: "Resume",
                id: _id || id,
              })),
              { type: "Resume", id: "LIST" },
            ]
          : [{ type: "Resume", id: "LIST" }],
    }),

    // ২. নির্দিষ্ট আইডি দিয়ে সিভি আনা
    getResumeById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Resume", id }],
    }),

    // ৩. নতুন সিভি তৈরি করা
    createResume: builder.mutation({
      query: (newResume) => ({
        url: "/",
        method: "POST",
        body: newResume,
      }),
      invalidatesTags: [{ type: "Resume", id: "LIST" }],
    }),

    // ৪. সিভি আপডেট করা
    updateResume: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Resume", id: "LIST" },
        { type: "Resume", id },
      ],
    }),

    // ৫. সিভি মুছে ফেলা
    deleteResume: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Resume", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllResumesQuery,
  useGetResumeByIdQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
} = resumeApi;

export default resumeApi;