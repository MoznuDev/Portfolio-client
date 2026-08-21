import { createSlice } from "@reduxjs/toolkit";

// LocalStorage থেকে নিরাপদভাবে ইউজার ডাটা লোড করার ফাংশন
const loadUserFromLocalStorage = () => {
  try {
    const storedAuth = localStorage.getItem("auth");
    const storedToken = localStorage.getItem("token");

    if (storedAuth) {
      const parsedData = JSON.parse(storedAuth);
      return {
        user: parsedData.user || null,
        token: parsedData.token || storedToken || null,
      };
    }

    // যদি কেবল 'token' নামে আলাদা থাকে
    if (storedToken) {
      return { user: null, token: storedToken };
    }

    return { user: null, token: null };
  } catch (error) {
    console.error("Failed to parse auth data from localStorage:", error);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    return { user: null, token: null };
  }
};

const initialData = loadUserFromLocalStorage();

const initialState = {
  user: initialData.user,
  token: initialData.token,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      // টোকেন থেকে অতিরিক্ত Quote বা Space ক্লিন করা
      const cleanToken =
        typeof token === "string" ? token.replace(/"/g, "").trim() : token;

      state.user = user;
      state.token = cleanToken;
      state.isLoading = false;

      try {
        // ১. 'auth' অবজেক্ট আকারে সেভ করা
        localStorage.setItem(
          "auth",
          JSON.stringify({ user, token: cleanToken }),
        );

        // ২. আলাদাভাবে 'token' কি-তেও সেভ রাখা (নিরাপত্তার জন্য)
        if (cleanToken) {
          localStorage.setItem("token", cleanToken);
        }
      } catch (error) {
        console.error("Failed to save auth to localStorage:", error);
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;

      // লোকাল স্টোরেজ থেকে সব অথ ডাটা ডিলিট করা
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
