import App from "@/App";
import { UnknownPage } from "@/components/layouts/UnknownPage";
import ErrorPage from "@/error-page";
import { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import DashboardLayout from "./components/layouts/Layout";
import { authRoutes } from "./components/auth/auth.routes";
import { dashboardRoutes } from "./components/pages/pages.routes";
import AuthLayout from "./components/auth";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyAccount from "./components/auth/VerifyAccount";
import ResetPassword from "./components/auth/ResetPassword";

// route-config.tsx

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App /> {/* Contains global providers only */}
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <DashboardLayout />, 
        children: dashboardRoutes,
      },
      {
        path: "auth/",
        element: <AuthLayout />, 
        children: [
          { index: true, path: "login", element: <Login /> },
          { path: "forgot-password", element: <ForgotPassword /> },
          { path: "verify", element: <VerifyAccount /> },
          { path: "reset-password", element: <ResetPassword /> },
        ],
      },
    ],
  },
]);


export default router;
