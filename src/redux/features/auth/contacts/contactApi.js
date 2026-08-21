import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../../utils/getBaseUrl";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    // index.js এর app.use("/api/contacts", contactRoute) এর সাথে মিলিয়ে দেখুন
    baseUrl: `${getBaseUrl()}/api/contacts`,
    credentials: "include",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    // Send Message -> POST /api/contacts/
    sendContactMessage: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    // Get All Messages -> GET /api/contacts/
    getAllContactMessages: builder.query({
      query: () => "/",
      providesTags: ["Contact"],
    }),

    // Mark as Read -> PATCH /api/contacts/:id/read
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Contact"],
    }),

    // Delete Message -> DELETE /api/contacts/:id
    deleteContactMessage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useSendContactMessageMutation,
  useGetAllContactMessagesQuery,
  useMarkAsReadMutation,
  useDeleteContactMessageMutation,
} = contactApi;

export default contactApi;