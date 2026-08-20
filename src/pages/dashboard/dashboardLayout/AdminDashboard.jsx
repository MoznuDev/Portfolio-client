import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../../redux/featurs/auth/authApi";
import { logout } from "../../../redux/featurs/auth/authSlice";




const navItem = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/hero-banner", label: "Add-HeroBanner" },
  { path: "/dashboard/manage-heroBanner", label: "Manage-HeroBanner" },
  { path: "/dashboard/add-service", label: "Add-Service" },
  { path: "/dashboard/manage-service", label: "Manage-Service" },
  { path: "/dashboard/add-skill", label: "Add-Skill" },
  { path: "/dashboard/manage-skill", label: "Manage-Skill" },
  { path: "/dashboard/add-project", label: "Add-Project" },
  { path: "/dashboard/manage-project", label: "Manage-Project" },
  { path: "/dashboard/add-blog", label: "Add-Blog" },
  { path: "/dashboard/manage-blog", label: "Manage-Blog" },
  { path: "/dashboard/manage-contact", label: "Manage-Contact" },
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
    <aside className="sidebar-container">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <Link className="brand-logo" to="/">
            Moznur Rahman<span className="dot">.</span>
          </Link>
          <p className="brand-sub">Admin dashboard</p>
        </div>

        <hr className="divider" />

        <ul className="nav-list">
          {navItem.map((item, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <hr className="divider" />
        <button onClick={handleLogout} className="logout-btn">
          LogOut
        </button>
      </div>
    </aside>
  );
};

export default AdminDashboard;