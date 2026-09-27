import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout/MainLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        index: true,
        component: Home,
      },
      
    ],
  },
]);

export default router;