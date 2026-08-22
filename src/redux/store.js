import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Reducer Imports
import authReducer from "./features/auth/authSlice";

import authApi from "./features/auth/authApi";
import heroBannerApi from "./features/heroBanner/heroBannerApi";
import serviceApi from "./features/service/serviceApi";
import skillApi from "./features/skill/skillApi";
import projectApi from "./features/project/projectApi";
import testimonialsApi from "./features/testimonials/testimonialsApi";
import reviewApi from "./features/reviews/reviewApi";
import blogApi from "./features/blogs/blogApi";
import contactApi from "./features/auth/contacts/contactApi";
import statsApi from "./features/stats/statsApi";
import clientApi from "./features/clients/clientApi";
import resumeApi from "./features/resumes/resumeApi";

export const store = configureStore({
  reducer: {
    // Auth State Reducer
    auth: authReducer,

    // API Reducers
    [authApi.reducerPath]: authApi.reducer,
    [heroBannerApi.reducerPath]: heroBannerApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [skillApi.reducerPath]: skillApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [resumeApi.reducerPath]: resumeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      heroBannerApi.middleware,
      serviceApi.middleware,
      skillApi.middleware,
      projectApi.middleware,
      testimonialsApi.middleware,
      reviewApi.middleware,
      blogApi.middleware,
      contactApi.middleware,
      statsApi.middleware,
      clientApi.middleware,
      resumeApi.middleware,
    ),

  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

export default store;
