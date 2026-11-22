import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import JobDetails from "../pages/Jobs/JobDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import RoleRoute from "./RoleRoute";
import JobApply from "../pages/Jobs/JobApply";
import MyApplications from "../pages/Jobs/MyApplications";
import FindJob from "../pages/Jobs/FindJob";
import AddJob from "../pages/Jobs/AddJob";
import MyPostedJobs from "../pages/Jobs/MyPostedJobs";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminUsers from "../pages/Dashboard/AdminUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/jobs/${params.id}`),
      },
      {
        path: "jobs/:id/apply",
        element: (
          <RoleRoute allowedRoles={["applicant"]}>
            <JobApply />
          </RoleRoute>
        ),
      },
      { path: "find-jobs", element: <FindJob /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          {
            path: "my-applications",
            element: (
              <RoleRoute allowedRoles={["applicant"]}>
                <MyApplications />
              </RoleRoute>
            ),
          },
          {
            path: "my-posted-jobs",
            element: (
              <RoleRoute allowedRoles={["hr", "admin"]}>
                <MyPostedJobs />
              </RoleRoute>
            ),
          },
          {
            path: "add-job",
            element: (
              <RoleRoute allowedRoles={["hr", "admin"]}>
                <AddJob />
              </RoleRoute>
            ),
          },
          {
            path: "add-job/:id",
            element: (
              <RoleRoute allowedRoles={["hr", "admin"]}>
                <AddJob />
              </RoleRoute>
            ),
          },
          {
            path: "users",
            element: (
              <RoleRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </RoleRoute>
            ),
          },
        ],
      },
      // Keep old URLs working while applying the same role restrictions.
      {
        path: "my-applications",
        element: (
          <RoleRoute allowedRoles={["applicant"]}>
            <MyApplications />
          </RoleRoute>
        ),
      },
      {
        path: "add-job",
        element: (
          <RoleRoute allowedRoles={["hr", "admin"]}>
            <AddJob />
          </RoleRoute>
        ),
      },
      {
        path: "add-job/:id",
        element: (
          <RoleRoute allowedRoles={["hr", "admin"]}>
            <AddJob />
          </RoleRoute>
        ),
      },
      {
        path: "my-posted-jobs",
        element: (
          <RoleRoute allowedRoles={["hr", "admin"]}>
            <MyPostedJobs />
          </RoleRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </RoleRoute>
        ),
      },
    ],
  },
]);
export default router;
