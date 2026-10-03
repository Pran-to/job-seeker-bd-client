import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import JobDetails from "../pages/Jobs/JobDetails";

const router = createBrowserRouter([
  {
    path: "/",
   element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element:<Register />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_URL}/jobs/${params.id}`),
      }

    ],
  },
]);

export default router;