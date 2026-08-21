import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const navItem = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/add-product", label: "add-product" },
  { path: "/dashboard/manage-products", label: "manage-products" },
  { path: "/dashboard/users", label: "users" },
  { path: "/dashboard/manage-orders", label: "manage-orders" },
];

const AdminDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      alert("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div className="">
        <div className="">
          <Link className="text-2xl font-bold text-center" to="/">
            Lebaba<span className="text-red-700">.</span>
          </Link>
          <p className="text-xs italic">Admin dashboard</p>
        </div>
        <hr className="mt-5" />
        <ul>
          {navItem.map((item, index) => (
            <li key={index} className="my-2 text-lg">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-red-700 ${isActive ? "text-red-700 font-bold" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* LogOut  */}
      <div className="items-center justify-center">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors duration-300"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
