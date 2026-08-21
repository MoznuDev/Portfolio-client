import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../../redux/features/auth/authApi";
import { logout } from "../../../redux/features/auth/authSlice";

const navItem = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/orders", label: "Orders" },
];

const UserDashboard = () => {
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
    <aside className="user-sidebar-container">
      <div className="user-sidebar-top">
        <div className="user-sidebar-brand">
          <NavLink className="user-brand-logo" to="/">
            Moznur Rahman<span className="user-dot">.</span>
          </NavLink>
          <p className="user-brand-sub">User dashboard</p>
        </div>

        <hr className="user-sidebar-divider" />

        <ul className="user-nav-list">
          {navItem.map((item, index) => (
            <li key={index} className="user-nav-item">
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `user-nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="user-sidebar-bottom">
        <hr className="user-sidebar-divider" />
        <button onClick={handleLogout} className="user-logout-btn">
          LogOut
        </button>
      </div>
    </aside>
  );
};

export default UserDashboard;
