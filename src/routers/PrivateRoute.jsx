import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const location = useLocation();

  const { user, token } = useSelector((state) => state.auth);

  // যদি Redux-এ token না থাকে তাহলে localStorage থেকে নিন
  const authToken = token || localStorage.getItem("token");

  // Login না থাকলে Login Page-এ পাঠাবে
  if (!authToken) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Role Check (Admin হলে)
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;