import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "user":
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="container flex mx-auto flex-col md:flex-row gap-8 items-start justify-start">
      <header className="lg:w-1/5 ms:w-2/5 w-full border mt-5 bg-gray-100 p-4">
        {renderDashboard()}
      </header>
      <main className="p-8 bg-white w-full border mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
