import { useSelector } from "react-redux";
import UserStats from "./UserStats";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetUserStatsQuery } from "../../../redux/features/stats/startsApi";
import Loading from "../../../../components/Loding";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: UserData,
    isLoading,
    error,
  } = useGetUserStatsQuery(user?.email);

  if (isLoading) return <Loading />;

  if (error) {
    return <div className="error-text">Failed to load user dashboard data</div>;
  }

  const stats = UserData?.data || {};
  const {
    totalPayments = 0,
    totalPurchasedProducts = 0,
    totalReviews = 0,
  } = stats;

  // Chart Data with Project Color Theme
  const data = {
    labels: ["Total Payments", "Total Purchased Products", "Total Reviews"],
    datasets: [
      {
        label: "User Stats",
        data: [totalPayments, totalPurchasedProducts, totalReviews],
        backgroundColor: ["#b91c1c", "#0284c7", "#eab308"], // Red, Blue, Yellow
        borderColor: ["#dc2626", "#38bdf8", "#fde047"],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#334155" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "#334155" },
      },
    },
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">User Dashboard</h2>
        <p className="welcome-text">
          Hi, <span className="highlight-user">{user?.username || "User"}</span>
          ! Welcome to your dashboard.
        </p>
      </div>

      <UserStats stats={stats} />

      <div className="chart-card">
        <h3 className="chart-title">Activity Overview</h3>
        <div className="chart-wrapper">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserDMain;
