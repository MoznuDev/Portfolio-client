import { useSelector } from "react-redux";
import AdminStats from "./AdminStats";

import AdminStatsChart from "./AdminStatsChart";
import Loading from "../../../../components/Loding";
import { useGetAdminStatsQuery } from "../../../../../redux/features/stats/statsApi";

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: adminData, isLoading, error } = useGetAdminStatsQuery();

  if (isLoading) return <Loading />;

  if (error) {
    return <div className="text-red-400 p-4">Failed to load data</div>;
  }

  const stats = adminData?.data || {};

  return (
    <div className="p-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        <p className="mb-6">
          Hi, {user?.username || "Admin"}! Welcome to your dashboard.
        </p>
      </div>
      <AdminStats stats={stats} />
      <AdminStatsChart stats={stats} />
    </div>
  );
};

export default AdminDMain;
