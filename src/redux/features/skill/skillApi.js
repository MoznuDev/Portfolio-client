import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfolio-backend-i63g.vercel.app/api/skill",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // যদি টোকেন থাকে
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Skill"],
  endpoints: (builder) => ({
    // 1. Get All Skills
    getSkills: builder.query({
      query: (category) => (category ? `?category=${category}` : "/"),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Skill", id: _id })),
              { type: "Skill", id: "LIST" },
            ]
          : [{ type: "Skill", id: "LIST" }],
    }),

    // 2. Add Skill
    addSkill: builder.mutation({
      query: (newSkill) => ({
        url: "/",
        method: "POST",
        body: newSkill,
      }),
      invalidatesTags: [{ type: "Skill", id: "LIST" }],
    }),

    // 3. Update Skill
    updateSkill: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Skill", id },
        { type: "Skill", id: "LIST" },
      ],
    }),

    // 4. Delete Skill
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Skill", id },
        { type: "Skill", id: "LIST" },
      ],
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