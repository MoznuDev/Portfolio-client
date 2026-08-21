import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/project`, // প্রয়োজন হলে 'projects' করে নিতে পারেন
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Project", "Review"],
  endpoints: (builder) => ({
    // ১. সকল Project লিস্ট পাওয়ার জন্য
    getProjects: builder.query({
      query: () => "/",
      providesTags: (result) => {
        const projectsList = Array.isArray(result)
          ? result
          : result?.projects || result?.data || [];

        return projectsList.length > 0
          ? [
              ...projectsList.map(({ _id, id }) => ({
                type: "Project",
                id: _id || id,
              })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }];
      },
    }),

    // ২. নির্দিষ্ট একটি Project-এর ডাটা পাওয়ার জন্য (ID বা Slug দিয়ে)
    getProjectById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    // ৩. নতুন Project তৈরি করার জন্য
    addProject: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),

    // ৪. Project আপডেট করার জন্য
    updateProject: builder.mutation({
      query: (args) => {
        // Safe extraction (হয় { id, data } অথবা { id, ...restData })
        const id = args.id;
        const body = args.data ? args.data : { ...args };
        delete body.id;

        return {
          url: `/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, args) => [
        { type: "Project", id: args.id },
        { type: "Project", id: "LIST" },
      ],
    }),

    // ৫. Project ডিলিট করার জন্য
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Project", id },
        { type: "Project", id: "LIST" },
      ],
    }),

    // ৬. প্রজেক্টের রিভিউসমূহ পাওয়ার জন্য
    getReviewsByProjectId: builder.query({
      query: (projectId) => `/${projectId}/reviews`,
      providesTags: (result, error, projectId) => [
        { type: "Review", id: projectId },
      ],
    }),

    // ৭. নতুন রিভিউ যোগ করার জন্য
    addReview: builder.mutation({
      query: ({ projectId, ...reviewData }) => ({
        url: `/${projectId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Review", id: projectId },
        { type: "Project", id: projectId },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetReviewsByProjectIdQuery,
  useAddReviewMutation,
} = projectApi;

export default projectApi;