// src/utils/getBaseUrl.js
const getBaseUrl = () => {
  return (
    import.meta.env.VITE_BACKEND_URL ||
    "https://portfolio-backend-i63g.vercel.app"
  );
};

export default getBaseUrl;
