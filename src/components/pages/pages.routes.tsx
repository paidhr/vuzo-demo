import { lazy } from "react";
import Home from "./home/Home";

const CreatePaygrade = lazy(() => import("./payroll/paygrades/CreatePaygrade"));
const GetPaygrades = lazy(() => import("./payroll/paygrades/GetPaygrades"));

const CreatePayband = lazy(() => import("./payroll/paybands/CreatePayband"));
const GetPaybands = lazy(() => import("./payroll/paybands/GetPaybands"));

const CreateAllowance = lazy(() => import("./payroll/allowances/CreateAllowance"));
const GetAllowances = lazy(() => import("./payroll/allowances/GetAllowances"));
const CreatePayschedules= lazy(() => import("./payroll/payschedules/CreatePayschedules"));
const GetPayschedules= lazy(() => import("./payroll/payschedules/GetPayschedules"));
const CreateCompany = lazy(() => import("./organizational/company/CreateCompany"));
const GetCompanies = lazy(() => import("./organizational/company/GetCompanies"));
const CreateWorkplace = lazy(() => import("./organizational/workplaces/CreateWorkplace"));
const GetWorkplaces = lazy(() => import("./organizational/workplaces/GetWorkplaces"));
const CreateEmployees = lazy(() => import("./organizational/employees/CreateEmployee"));
const GetEmployees= lazy(() => import("./organizational/employees/GetEmployees"));

export const dashboardRoutes = [
  {
    index: true,
    element: <Home />,
  },
  // PAYROLL
  {
    path: "/paygrade/create",
    element: <CreatePaygrade />,
  },
  {
    path: "/paygrade/get",
    element: <GetPaygrades />,
  },
  {
    path: "/payband/create",
    element: <CreatePayband />,  },
  {
    path: "/payband/get",
        element: <GetPaybands />,

  },
  {
    path: "/allowances/create",
    element: <CreateAllowance />,
  },
  {
    path: "/allowances/get",
    element: <GetAllowances />,
  },
  {
    path: "/pay-schedules/create",
    element: <CreatePayschedules />,
  },
  {
    path: "/pay-schedules/get",
    element: <GetPayschedules />,
  },
  // ORGANIZATIONAL
  {
    path: "/company/create",
    element: <CreateCompany />,
  },
  {
    path: "/company/get",
    element: <GetCompanies />,
  },
  {
    path: "/workplace/create",
    element: <CreateWorkplace />,
  },
  {
    path: "/workplace/get",
    element: <GetWorkplaces />,
  },
  {
    path: "/employees/create",
    element: <CreateEmployees />,
  },
  {
    path: "/employees/get",
    element: <GetEmployees />,
  },
];
