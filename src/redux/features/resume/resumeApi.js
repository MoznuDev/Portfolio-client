import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resumeApi = createApi({
  reducerPath: "resumeApi",
  // baseUrl-এ /resumes পর্যন্ত দেওয়া
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/resume" }),
  tagTypes: ["Resume"],
  endpoints: (builder) => ({
    // 1. GET: সব সিভি ডাটা ফেচ করা (url হবে: http://localhost:5000/api/resumes)
    getAllResumes: builder.query({
      query: () => "/",
      providesTags: ["Resume"],
    }),

    // 2. GET: নির্দিষ্ট আইডি দিয়ে সিভি আনা (url হবে: http://localhost:5000/api/resumes/:id)
    getResumeById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Resume", id }],
    }),

    // 3. POST: নতুন সিভি তৈরি করা
    createResume: builder.mutation({
      query: (newResume) => ({
        url: "/",
        method: "POST",
        body: newResume,
      }),
      invalidatesTags: ["Resume"],
    }),

    // 4. PUT: সিভি আপডেট করা
    updateResume: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Resume",
        { type: "Resume", id },
      ],
    }),

    // 5. DELETE: সিভি মুছে ফেলা
    deleteResume: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resume"],
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
