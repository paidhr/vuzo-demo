import Login from "@/components/auth/Login";
import RegisterBusiness from "@/components/auth/Register";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import VerifyAccount from "@/components/auth/VerifyAccount";

export const authRoutes = [
  {
    index: true,
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify",
    element: <VerifyAccount />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "register",
    element: <RegisterBusiness />,
  },
];
