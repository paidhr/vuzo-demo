import { lazy } from "react";
import Home from "./home/Home";

const CreatePaygrade = lazy(() => import("./payroll/CreatePaygrade"));
const CreatePayband = lazy(() => import("./payroll/CreatePayband"));
const CreateAllowance = lazy(() => import("./payroll/CreateAllowance"));
const CreateCompany = lazy(() => import("./company/CreateCompany"));

export const dashboardRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/payroll/paygrades/create",
    element: <CreatePaygrade />,
  },
  {
    path: "/payroll/paybands/create",
    element: <CreatePayband />,
  },
  {
    path: "/payroll/allowances/create",
    element: <CreateAllowance />,
  },
  // COMPANY
  {
    path: "/company/create",
    element: <CreateCompany />,
  },
];
