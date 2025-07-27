import LoginImg from "@/assets/images/opps.png";
import { Outlet, useLocation } from "react-router-dom";
import { H2 } from "../ui/typography";

const paths = [
  { pathname: "/auth/register", title: "Register" },
  { pathname: "/auth/verify", title: "Verify Account" },
  { pathname: "/auth/login", title: "Welcome Back" },
  { pathname: "/auth/forgot-password", title: "Forgot Password" },
  { pathname: "/auth/reset-password", title: "Reset Password" },
];

const AuthLayout = () => {
  const { pathname } = useLocation();

  const title = paths.find((i) => i.pathname === pathname)?.title || "";

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-stretch gap-6 xl:gap-10">
        <div className="hidden  bg-[#F3F5FB] w-full md:max-w-[600px] 2xl:max-w-[650px] h-dvh lg:grid place-content-center px-6">
          <div className="mb-6 ">
            <img
              className=""
              src={LoginImg}
              alt="logoin"
              width={426}
              height={288}
            />
          </div>
          <H2 className="font-bold text-padeBlack text-2xl text-center">
            {title}
          </H2>
        </div>

        <div className="grow w-full max-w-[580px] mx-auto pt-10 lg:pt-0 lg:pr-10 lg:flex lg:justify-center lg:items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
