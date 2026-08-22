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
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id, id }) => ({
                type: "Blogs",
                id: _id || id,
              })),
              { type: "Blogs", id: "LIST" },
            ]
          : [{ type: "Blogs", id: "LIST" }],
    }),

    // ২. Slug দিয়ে নির্দিষ্ট ব্লগ ফেচ করার জন্য (GET /api/blogs/slug/:slug)
    getBlogBySlug: builder.query({
      query: (slug) => `/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blogs", id: slug }],
    }),

    // ৩. নতুন ব্লগ তৈরি করার জন্য (POST /api/blogs) -> [Fixed URL Mismatch]
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/",
        method: "POST",
        body: newBlog, // Works seamlessly with both JSON & FormData
      }),
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),

    // ৪. ব্লগ আপডেট করার জন্য (PUT /api/blogs/:id) -> [Fixed Method & Body]
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data, // Accepts FormData or JSON Object
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Blogs", id: "LIST" },
        { type: "Blogs", id },
      ],
    }),

    // ৫. ব্লগ ডিলিট করার জন্য (DELETE /api/blogs/:id)
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
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