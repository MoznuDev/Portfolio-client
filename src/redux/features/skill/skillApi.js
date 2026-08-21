import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/skills",
  }),
  tagTypes: ["Skills"],
  endpoints: (builder) => ({
    // 1. Get All Skills
    getSkills: builder.query({
      query: () => "/",
      providesTags: ["Skill"],
    }),

    // 2. Add Skill
    addSkill: builder.mutation({
      query: (newSkill) => ({
        url: "/",
        method: "POST",
        body: newSkill,
      }),
      invalidatesTags: ["Skill"],
    }),

    // 3. Update Skill
    updateSkill: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Skills"],
    }),

    // 4. Delete Skill
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
export default skillApi;
