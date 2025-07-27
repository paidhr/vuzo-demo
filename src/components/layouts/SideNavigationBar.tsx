import React, { useState } from "react";
import { logos } from "@/assets/logos";
import { NavLink } from "react-router-dom";
import { BadgeDollarSign, ChevronUpIcon, Home, Wallet } from "lucide-react";
import { Caption } from "../ui/typography";
import { Space, Tag } from "antd";

type ActionType = {
  title: string;
  icon: JSX.Element;
  heading?: string;
  route?: string;
  patterns?: { path: string }[];
  enabled?: boolean;
  badge?: boolean;
  newTab?: boolean;
  subActions?: {
    title: string;
    route: string;
    patterns: { path: string }[];
    enabled: boolean;
  }[];
  isExternal?: boolean;
};

const NavTab: React.FC<{
  action: ActionType;
  toggleSidebar?: VoidFunction;
}> = ({ action, toggleSidebar }) => {
  const [subActionsOpen, toggleSubActionsOpen] = useState<boolean>(false);

  return (
    <div>
      {action.isExternal ? (
        <a
          href={action.route}
          target="_blank"
          className={`w-full flex justify-start items-center gap-3 px-3 py-2  hover:bg-[#28313D] hover:text-white hover:rounded-[10px] text-neutral50 tracking-wide`}
          onClick={() => {
            toggleSidebar?.();
          }}
        >
          <span>{action.icon}</span>
          <span className="mt-0.5 font-avenir">{action.title}</span>
        </a>
      ) : action.subActions && action.subActions?.length > 0 ? (
        <>
          <button
            className={`w-full flex justify-between items-center gap-3 px-3 py-2  hover:text-a11y hover:rounded-[10px]  ${
              subActionsOpen === true
                ? ` text-white rounded-[10px] font-avenir tracking-wider`
                : "text-neutral50 tracking-wide"
            }`}
            onClick={() => toggleSubActionsOpen(!subActionsOpen)}
          >
            <div className="flex items-center justify-center gap-3 font-avenir">
              {action.icon}
              <span className="mt-0.5">{action.title}</span>
              {action.badge ? (
                <Space size={[0, 2]} wrap>
                  <Tag color="gold">beta</Tag>
                </Space>
              ) : (
                ""
              )}
            </div>
            <ChevronUpIcon
              className={`ease-in-out transition-all w-4 rotate-180 ${
                subActionsOpen === true && "rotate-0"
              }`}
            />
          </button>

          {subActionsOpen === true && (
            <div className="border-l border-a11y flex flex-col gap-0.5 ml-[30px] my-1 pl-2">
              {action?.subActions?.map((action, index) =>
                !action.enabled ? (
                  ""
                ) : (
                  <NavLink
                    key={index}
                    to={action.route}
                    className={({ isActive }) => {
                      return `w-full flex justify-start items-center gap-3 px-3 py-2  hover:bg-[#28313D] hover:text-white hover:rounded-[10px] ${
                        isActive
                          ? "bg-[#28313D] text-white rounded-[10px]  font-avenir tracking-wider"
                          : "text-neutral50 tracking-wide"
                      }`;
                    }}
                    onClick={() => {
                      toggleSidebar?.();
                    }}
                  >
                    {action.title}
                  </NavLink>
                )
              )}
            </div>
          )}
        </>
      ) : action.enabled ? (
        <NavLink
          to={action.route as string}
          target={action.newTab === true ? "_blank" : "_self"}
          className={({ isActive }) => {
            return `w-full flex justify-start items-center gap-3 px-3 py-2  hover:bg-[#28313D] hover:text-white hover:rounded-[10px] ${
              isActive
                ? "bg-[#28313D] text-white rounded-[10px]  font-avenir tracking-wider"
                : "text-neutral50 tracking-wide"
            }`;
          }}
          onClick={() => {
            toggleSidebar?.();
          }}
        >
          <span>{action.icon}</span>
          <span className="mt-0.5 font-avenir">{action.title}</span>
        </NavLink>
      ) : null}
    </div>
  );
};

const navItems = [
  {
    title: "payroll",
    actions: [
      {
        title: "Create Allowance",
        route: "/payroll/allowances/create",
        icon: <Wallet className="w-4" />,
        enabled: true,
      },
      {
        title: "Create Paygrade",
        route: "/payroll/paygrades/create",
        icon: <BadgeDollarSign className="w-4" />,
        enabled: true,
      },
      {
        title: "Create Payband",
        route: "/payroll/paybands/create",
        icon: <BadgeDollarSign className="w-4" />,
        enabled: true,
      },
    ],
  },
];

const SideNavigationBar: React.FC<{
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSidebarOpen, toggleSidebar }) => {
  const handleToggleSidebar = () => {
    toggleSidebar(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black/30  cursor-pointer backdrop-blur-sm"
          onClick={handleToggleSidebar}
        />
      )}
      <div
        className={`custom__sidebar__scrollbar ${
          !isSidebarOpen ? "w-0" : "w-[280px]"
        } pb-20 md:pb-0 fixed top-0 bottom-0 z-20 md:left-0 md:w-[280px] h-[100dvh] bg-[#18212E] shadow-xl transition-all duration-75 ease-in-out overflow-y-auto `}
      >
        <div className="h-full w-full py-[18px] px-3 flex flex-col justify-start gap-3">
          {/* Brand */}
          <div className="mb-10">
            <img
              src={logos.PadeLogoWhite}
              alt="Pade Logo"
              className="w-[120px]"
            />
          </div>

          {/* Menu */}
          <div className="h-full w-full flex flex-col gap-8">
            <div className=" w-full flex flex-col gap-6">
              <div className="space-y-2">
                <NavTab
                  action={{
                    title: "Home",
                    route: "/",
                    icon: <Home className="w-4" />,
                    enabled: true,
                  }}
                  toggleSidebar={handleToggleSidebar}
                />
              </div>
              {navItems.map((navItem, index) => (
                <div key={index}>
                  <Caption className="text-[10px] pl-6 text-white/60 mb-2 uppercase">
                    {navItem.title}
                  </Caption>
                  <div className="space-y-2">
                    {navItem.actions.map((action, actionIndex) => (
                      <NavTab
                        action={action}
                        key={actionIndex}
                        toggleSidebar={handleToggleSidebar}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavigationBar;
