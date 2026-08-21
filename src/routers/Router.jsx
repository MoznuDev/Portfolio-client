import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import Home from "../pages/home/Home";
import Services from "../pages/service/Services";
import Skill from "../pages/skill/Skill";
import Testimonials from "../pages/home/Testimonials";
import Blog from "../pages/blog/Blog";
import Contact from "../pages/contact/Contact";
import ProjectsPage from "../pages/ProjectPage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../pages/dashboard/dashboardLayout/DashboardLayout";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import UserDMain from "../pages/dashboard/user/UserDMain";
import AddHeroBanner from "../pages/dashboard/admin/addHeroBanner/AddHeroBanner";
import ManageHeroBanner from "../pages/dashboard/admin/addHeroBanner/manageHeroBanner";
import AddService from "../pages/dashboard/admin/addService/AddService";
import ManageService from "../pages/dashboard/admin/addService/ManageService";
import AddSkill from "../pages/dashboard/admin/addSkill/AddSkill";
import ManageSkill from "../pages/dashboard/admin/addSkill/ManageSkill";
import AddProject from "../pages/dashboard/admin/projects/AddProject";
import ManageProject from "../pages/dashboard/admin/projects/ManageProject";
import AddBlog from "../pages/dashboard/admin/blog/AddBlog";
import ManageBlog from "../pages/dashboard/admin/blog/ManageBlog";
import ManageContact from "../pages/dashboard/admin/contact/ManageContact";
import UserOrders from "../pages/dashboard/user/orders/UserOrder";
import SingleProjectPage from "../pages/projects/SingleProjectPage";
import About from "../pages/about/About";
import Discover from "../pages/discover/Discover";
import Explore from "../pages/explore/Explore";
import Books from "../pages/books/Books";
import TermsOfService from "../pages/termsofservice/TermsOfService";
import PrivacyPolicy from "../pages/privacy/PrivacyPolicy";
import Resume from "../pages/home/Resume";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/skill",
        element: <Skill />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:id",
        element: <SingleProjectPage />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "user",
        element: <UserDMain />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <AdminDMain />
          </PrivateRoute>
        ),
      },
      {
        path: "hero-banner",
        element: (
          <PrivateRoute role="admin">
            <AddHeroBanner />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-heroBanner",
        element: (
          <PrivateRoute role="admin">
            <ManageHeroBanner />
          </PrivateRoute>
        ),
      },
      {
        path: "add-service",
        element: (
          <PrivateRoute role="admin">
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-service",
        element: (
          <PrivateRoute role="admin">
            <ManageService />
          </PrivateRoute>
        ),
      },
      {
        path: "add-skill",
        element: (
          <PrivateRoute role="admin">
            <AddSkill />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-skill",
        element: (
          <PrivateRoute role="admin">
            <ManageSkill />
          </PrivateRoute>
        ),
      },
      {
        path: "add-project",
        element: (
          <PrivateRoute role="admin">
            <AddProject />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-project",
        element: (
          <PrivateRoute role="admin">
            <ManageProject />
          </PrivateRoute>
        ),
      },
      {
        path: "add-blog",
        element: (
          <PrivateRoute role="admin">
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-blog",
        element: (
          <PrivateRoute role="admin">
            <ManageBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-contact",
        element: (
          <PrivateRoute role="admin">
            <ManageContact />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
