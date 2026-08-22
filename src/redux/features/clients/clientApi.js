import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";

const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/clients`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    // ১. সকল ক্লায়েন্ট লোগো ফেচ করা
    getClients: builder.query({
      query: () => "/",
      providesTags: (result) => {
        const clientList = Array.isArray(result)
          ? result
          : result?.clients || result?.data || [];

        return clientList.length > 0
          ? [
              ...clientList.map(({ _id, id }) => ({
                type: "Clients",
                id: _id || id,
              })),
              { type: "Clients", id: "LIST" },
            ]
          : [{ type: "Clients", id: "LIST" }];
      },
    }),

    // ২. নতুন ক্লায়েন্ট লোগো যোগ করা
    addClient: builder.mutation({
      query: (newClient) => ({
        url: "/",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: [{ type: "Clients", id: "LIST" }],
    }),

    // ৩. ক্লায়েন্ট ডিলিট করা
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Clients", id },
        { type: "Clients", id: "LIST" },
      ],
    }),
  }),
});

// Auto-generated hooks Export
export const {
  useGetClientsQuery,
  useAddClientMutation,
  useDeleteClientMutation,
} = clientApi;

export default clientApi;