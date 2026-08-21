import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

// Base URL clean up (Trailing slash সরিয়ে ফেলা)
const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/services`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Redux State অথবা LocalStorage থেকে টোকেন নেওয়া
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    // ১. সব সার্ভিস ফেচ করা
    getServices: builder.query({
      query: () => "",
      providesTags: (result) => {
        // Backend Response থেকে Array টি সঠিকভাবে বের করা
        const servicesList = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : [];

        return servicesList.length > 0
          ? [
              ...servicesList.map(({ _id, id }) => ({
                type: "Services",
                id: _id || id,
              })),
              { type: "Services", id: "LIST" },
            ]
          : [{ type: "Services", id: "LIST" }];
      },
    }),

    // ২. নতুন সার্ভিস তৈরি করা
    createService: builder.mutation({
      query: (newService) => ({
        url: "/create-service",
        method: "POST",
        body: newService,
      }),
      invalidatesTags: [{ type: "Services", id: "LIST" }],
    }),

    // ৩. সার্ভিস আপডেট করা
    updateService: builder.mutation({
      query: ({ id, ...updatedService }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updatedService,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Services", id },
        { type: "Services", id: "LIST" },
      ],
    }),

    // ৪. সার্ভিস ডিলিট করা
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Services", id },
        { type: "Services", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;

export default serviceApi;
