import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// ১. Auth Slice Import (User state & Token ধরে রাখার জন্য)
import authReducer from './featurs/auth/authSlice'; 

// ২. API Slices Import
import { authApi } from './featurs/auth/authApi';
import { heroBannerApi } from './featurs/hero/heroBannerApi';
import { serviceApi } from './featurs/services/serviceApi';
import { skillApi } from './featurs/skill/skillApi';
import { projectApi } from './featurs/project/projectsApi'; 
import { testimonialsApi } from './featurs/testimonials/testimonialsApi';
import { reviewApi } from './featurs/reviews/reviewApi';
import { blogApi } from './featurs/blog/blogApi';
import { contactApi } from './featurs/auth/contacts/contactApi'; 
import { statsApi } from './featurs/starts/startsApi'; 
import { clientApi } from './featurs/client/clientApi'; 
import { resumeApi } from './featurs/resume/resumeApi';

// সব API গুলোর একটি অ্যারে
const apis = [
  authApi,
  heroBannerApi,
  serviceApi,
  skillApi,
  projectApi,
  testimonialsApi,
  reviewApi,
  blogApi,
  contactApi,
  statsApi,
  clientApi,
  resumeApi
];

export const store = configureStore({
  // ৩. Reducers
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

  // ৪. Middlewares (Spread operator দিয়ে)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...apis.map((api) => api.middleware)), 
  devTools: import.meta.env.DEV, 
});

// Refetch on focus / reconnect সেটআপ
setupListeners(store.dispatch);

export default store;