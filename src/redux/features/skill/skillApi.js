import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfolio-backend-i63g.vercel.app/api/skill",
  }),
  tagTypes: ["skill"],
  endpoints: (builder) => ({
    // 1. Get All skill
    getskill: builder.query({
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
      invalidatesTags: ["skill"],
    }),

    // 4. Delete Skill
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skill"],
    }),
  }),
});

export const {
  useGetskillQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;
export default skillApi;
