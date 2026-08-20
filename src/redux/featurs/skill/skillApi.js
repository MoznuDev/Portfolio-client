import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillApi = createApi({
  reducerPath: "skillApi",
  baseQuery: fetchBaseQuery({
    // ⚠️ আপনার server.js অনুযায়ী মূল Base URL নিশ্চিত করুন (যেমন: http://localhost:5000/api/skills)
    baseUrl: "http://localhost:5000/api/skills",
  }),
  tagTypes: ["Skill"],
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

    // 3. Update Skill (🚨 এখানে ভুল ছিল)
    updateSkill: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        // ⚠️ নিশ্চিত করুন এখানে baseQuery-এর পর /:id সঠিকভাবে যোগ হচ্ছে
        // যদি baseUrl "http://localhost:5000/api/skills" হয়, তবে url হবে `/${id}`
        url: `/${id}`, 
        method: "PUT", // ব্যাকএন্ডে router.put("/:id") থাকায় PUT হতে হবে
        body: updatedData,
      }),
      invalidatesTags: ["Skill"],
    }),

    // 4. Delete Skill
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skill"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useUpdateSkillMutation, // 👈 এটি আপডেট ফর্মে ব্যবহার করবেন
  useDeleteSkillMutation,
} = skillApi;