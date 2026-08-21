import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/getBaseUrl";


// ========================================
// Base URL
// ========================================
const rawBaseUrl = getBaseUrl().replace(/\/$/, "");

// ========================================
// Auth API
// ========================================
export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${rawBaseUrl}/api/auth`,

    // Cookie পাঠানোর জন্য
    credentials: "include",

    // JWT Authorization Header
    prepareHeaders: (headers, { getState }) => {
      // Redux State বা LocalStorage থেকে টোকেন নেওয়ার ব্যবস্থা
      const token = getState()?.auth?.token || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Users", "User"],

  endpoints: (builder) => ({
    // ========================================
    // REGISTER
    // POST /api/auth/register
    // ========================================
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),

    // ========================================
    // LOGIN
    // POST /api/auth/login
    // ========================================
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // ========================================
    // LOGOUT
    // POST /api/auth/logout
    // ========================================
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // ========================================
    // GET LOGGED-IN USER
    // GET /api/auth/me
    // ========================================
    getLoggedInUser: builder.query({
      query: () => "/me",
      providesTags: ["User"],
    }),

    // ========================================
    // FORGOT PASSWORD
    // POST /api/auth/forgot-password
    // ========================================
    forgotPassword: builder.mutation({
      query: (formData) => ({
        url: "/forgot-password",
        method: "POST",
        body: formData,
      }),
    }),

    // ========================================
    // EDIT PROFILE
    // PATCH /api/auth/edit-profile/:id
    // ========================================
    editProfile: builder.mutation({
      query: ({ id, profileData }) => ({
        url: `/edit-profile/${id}`,
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["User", "Users"],
    }),

    // ========================================
    // GET ALL USERS
    // GET /api/auth/users
    // ========================================
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    // ========================================
    // DELETE USER
    // DELETE /api/auth/users/:id
    // ========================================
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // ========================================
    // UPDATE USER ROLE
    // PUT /api/auth/users/:id
    // ========================================
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: {
          role,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// ========================================
// Export Hooks
// ========================================
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetLoggedInUserQuery,
  useForgotPasswordMutation,
  useEditProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} = authApi;

export default authApi;