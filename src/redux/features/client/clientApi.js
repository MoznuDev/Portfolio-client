import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfolio-backend-89ma.vercel.app/api/client",
  }),
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    // ১. সব ক্লায়েন্ট লোগো ফেচ করার জন্য
    getClients: builder.query({
      query: () => "/clients",
      providesTags: ["Clients"],
    }),

    // ২. নতুন ক্লায়েন্ট লোগো যোগ করার জন্য (অ্যাডমিন ড্যাশবোর্ডের জন্য)
    addClient: builder.mutation({
      query: (newClient) => ({
        url: "/clients",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),

    // ৩. ক্লায়েন্ট ডিলিট করার জন্য
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
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
