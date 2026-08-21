import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/blogs`, 
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    // ১. সব ব্লগ ফেচ করার জন্য (GET /api/blogs)
    getBlogs: builder.query({
      query: () => "/",
      providesTags: ["Blogs"],
    }),

    // ২. Slug দিয়ে নির্দিষ্ট ব্লগ ফেচ করার জন্য (GET /api/blogs/slug/:slug)
    getBlogBySlug: builder.query({
      query: (slug) => `/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blogs", id: slug }],
    }),

    // ৩. নতুন ব্লগ তৈরি করার জন্য (POST /api/blogs/create-blog)
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/create-blog",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),

    // ৪. ব্লগ আপডেট করার জন্য (PATCH /api/blogs/:id)
    updateBlog: builder.mutation({
      query: ({ id, ...updatedBlog }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updatedBlog,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Blogs",
        { type: "Blogs", id },
      ],
    }),

    // ৫. ব্লগ ডিলিট করার জন্য (DELETE /api/blogs/:id)
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

export default blogApi;
