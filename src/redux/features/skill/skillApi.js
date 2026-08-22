import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfolio-backend-89ma.vercel.app/api/skill",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Skill"],
  endpoints: (builder) => ({
    // 1. Get All Skills
    getSkills: builder.query({ // 👈 Plural (getSkills) করা হলো
      query: (category) => (category ? `?category=${category}` : "/"),
      providesTags: (result) => {
        const skillArray = Array.isArray(result?.data) 
          ? result.data 
          : Array.isArray(result) 
          ? result 
          : [];
          
        return skillArray.length > 0
          ? [
              ...skillArray.map(({ _id, id }) => ({ type: "Skill", id: _id || id })),
              { type: "Skill", id: "LIST" },
            ]
          : [{ type: "Skill", id: "LIST" }];
      },
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

// ✅ এখন সঠিকভাবে Hook গুলো এক্সপোর্ট হবে
export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillApi;

export default skillApi;