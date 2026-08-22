// src/utils/getBaseUrl.js
const getBaseUrl = () => {
  return (
    import.meta.env.VITE_BACKEND_URL ||
    "https://portfolio-backend-89ma.vercel.app"
  );
};

export default getBaseUrl;