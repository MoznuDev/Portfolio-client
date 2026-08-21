import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RiDashboardLine,
  RiShoppingBagLine,
  RiLoginBoxLine,
  RiLogoutBoxRLine,
  RiMenu3Line,
  RiCloseLine,
  RiUser3Line,
} from "react-icons/ri";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const adminDashboardMenus = [
  {
    label: "Admin Dashboard",
    icon: <RiDashboardLine />,
    path: "/dashboard/admin",
  },
  {
    label: "Hero Banner",
    icon: <RiDashboardLine />,
    path: "dashboard/hero-banner",
  },
  {
    label: "Add Service",
    icon: <RiShoppingBagLine />,
    path: "/dashboard/add-service",
  },
  {
    label: "Add Skills",
    icon: <RiShoppingBagLine />,
    path: "/dashboard/add-skill",
  },
  {
    label: "Add Projects",
    icon: <RiShoppingBagLine />,
    path: "/dashboard/add-project",
  },
  {
    label: "Add Blog",
    icon: <RiShoppingBagLine />,
    path: "/dashboard/add-blog",
  },
];

const userDashboardMenus = [
  {
    label: "User Dashboard",
    icon: <RiDashboardLine />,
    path: "/dashboard/user",
  },
  {
    label: "My Orders",
    icon: <RiShoppingBagLine />,
    path: "/dashboard/orders",
  },
  {
    label: "Profile Settings",
    icon: <RiUser3Line />,
    path: "/dashboard/profile",
  },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "My Skills", path: "/skills" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Store থেকে ইউজার ডাটা আনা
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // ইউজারের রোলের উপর ভিত্তি করে ড্রপডাউন মেনু ফিল্টার
  const dropDownMenus =
    user?.role?.toLowerCase() === "admin"
      ? adminDashboardMenus
      : userDashboardMenus;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          Moznur Rahman
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links-desktop">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.path} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions-desktop">
          <Link to="/projects">
            <button className="btn-primary btn-full">Buy Now</button>
          </Link>

          {!user ? (
            /* Guest User (Not Logged In) */
            <div className="guest-action-group">
              <span className="guest-user-icon" title="Guest User">
                <RiUser3Line />
              </span>
              <Link to="/login" className="btn-outline">
                <RiLoginBoxLine />
                <span>Login</span>
              </Link>
            </div>
          ) : (
            /* Logged In User Avatar & Dropdown */
            <div className="profile-menu-container" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="profile-avatar-btn"
                aria-label="User menu"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user?.name || "User"}
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-fallback">
                    <RiUser3Line />
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-user-info">
                    <p className="user-name">{user?.name || "User"}</p>
                    <span className={`role-badge ${user?.role}`}>
                      {user?.role === "admin" ? "Admin" : "User"}
                    </span>
                  </div>

                  <div className="dropdown-divider"></div>

                  <div className="dropdown-header">
                    {user?.role === "admin" ? "Admin Panel" : "User Dashboard"}
                  </div>

                  {dropDownMenus.map((menu) => (
                    <Link
                      key={menu.label}
                      to={menu.path}
                      onClick={() => setIsProfileOpen(false)}
                      className="dropdown-item"
                    >
                      {menu.icon}
                      <span>{menu.label}</span>
                    </Link>
                  ))}

                  <div className="dropdown-divider"></div>

                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    <RiLogoutBoxRLine />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="nav-link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {user && (
          <div className="mobile-admin-section">
            <div className="mobile-user-profile">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user?.name || "User"}
                  className="avatar-img-sm"
                />
              ) : (
                <div className="avatar-fallback-sm">
                  <RiUser3Line />
                </div>
              )}
              <div>
                <p className="mobile-user-name">{user?.name || "User"}</p>
                <span className="mobile-user-role">
                  {user?.role === "admin" ? "Administrator" : "User"}
                </span>
              </div>
            </div>

            <div className="mobile-admin-title">Navigation</div>
            {dropDownMenus.map((menu) => (
              <Link
                key={menu.label}
                to={menu.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="dropdown-item"
              >
                {menu.icon}
                <span>{menu.label}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mobile-actions">
          <Link to="/projects">
            <button className="btn-primary btn-full">Buy Now</button>
          </Link>

          {!user ? (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-outline btn-full"
            >
              <RiLoginBoxLine />
              <span>Login</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="btn-outline btn-full logout-btn"
            >
              <RiLogoutBoxRLine />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
