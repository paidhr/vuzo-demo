import React, { useState } from "react";
import { logos } from "@/assets/logos";
import { NavLink } from "react-router-dom";
import { BadgeDollarSign, Banknote, CalendarCheck2, ChevronUpIcon, Home, HousePlus, Users, Wallet } from "lucide-react";
import { Caption } from "../ui/typography";
import { Space, Tag } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
  openSubmenu?: string | null;
  onSubmenuToggle?: (title: string) => void;
}> = ({ action, toggleSidebar, openSubmenu, onSubmenuToggle }) => {
  const isOpen = openSubmenu === action.title;

  return (
    <div>
      {action.isExternal ? (
        <a
          href={action.route}
          target="_blank"
          className="w-full flex justify-start items-center gap-3 px-3 py-2 hover:bg-[#28313D] hover:text-white hover:rounded-[10px] text-neutral50 tracking-wide"
          onClick={() => {
            toggleSidebar?.();
          }}
        >
          <span>{action.icon}</span>
          <span className="mt-0.5 font-avenir">{action.title}</span>
        </a>
      ) : action.subActions && action.subActions.length > 0 ? (
        <>
          <button
            className={`w-full flex justify-between items-center gap-3 px-3 py-2 hover:text-a11y hover:rounded-[10px] ${
              isOpen
                ? "text-white rounded-[10px] font-avenir tracking-wider"
                : "text-neutral50 tracking-wide"
            }`}
            onClick={() => onSubmenuToggle?.(action.title)}
          >
            <div className="flex items-center justify-center gap-3 font-avenir">
              {action.icon}
              <span className="mt-0.5">{action.title}</span>
              {action.badge && (
                <Space size={[0, 2]} wrap>
                  <Tag color="gold">beta</Tag>
                </Space>
              )}
            </div>
            <ChevronUpIcon
              className={`ease-in-out transition-all w-4 rotate-180 ${
                isOpen && "rotate-0"
              }`}
            />
          </button>

          {isOpen && (
            <div className="border-l border-a11y flex flex-col gap-0.5 ml-[30px] my-1 pl-2">
              {action.subActions.map(
                (subAction, index) =>
                  subAction.enabled && (
                    <NavLink
                      key={index}
                      to={subAction.route}
                      className={({ isActive }) =>
                        `w-full flex justify-start items-center gap-3 px-3 py-2 hover:bg-[#28313D] hover:text-white hover:rounded-[10px] ${
                          isActive
                            ? "bg-[#28313D] text-white rounded-[10px] font-avenir tracking-wider"
                            : "text-neutral50 tracking-wide"
                        }`
                      }
                      onClick={() => toggleSidebar?.()}
                    >
                      {subAction.title}
                    </NavLink>
                  )
              )}
            </div>
          )}
        </>
      ) : action.enabled ? (
        <NavLink
          to={action.route as string}
          target={action.newTab ? "_blank" : "_self"}
          className={({ isActive }) =>
            `w-full flex justify-start items-center gap-3 px-3 py-2 hover:bg-[#28313D] hover:text-white hover:rounded-[10px] ${
              isActive
                ? "bg-[#28313D] text-white rounded-[10px] font-avenir tracking-wider"
                : "text-neutral50 tracking-wide"
            }`
          }
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
    title: "organization",
    actions: [
      {
        title: "Companies",
        icon: <Home className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Company",
            route: "/company/create",
            patterns: [{ path: "/company/create" }],
            enabled: true,
          },
          {
            title: "Get Companies",
            route: "/company/get",
            patterns: [{ path: "/company/get" }],
            enabled: true,
          },
        ],
      },
      {
        title: "Workplaces",
        icon: <HousePlus className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Workplace",
            route: "/workplace/create",
            patterns: [{ path: "/workplace/create" }],
            enabled: true,
          },
          {
            title: "Get Workplaces",
            route: "/workplace/get",
            patterns: [{ path: "/workplace/get" }],
            enabled: true,
          },
        ],
      },
     
    
      {
        title: "Employees",
        icon: <Users className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Employee",
            route: "/employees/create",
            patterns: [{ path: "/employees/create" }],
            enabled: true,
          },
          {
            title: "Get Employees",
            route: "/employees/get",
            patterns: [{ path: "/employees/get" }],
            enabled: true,
          },
        ],
      },
    ],
  },
   {
    title: "payroll",
    actions: [
        {
        title: "Paygrades",
        icon: <BadgeDollarSign className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Paygrade",
            route: "/paygrade/create",
            patterns: [{ path: "/paygrade/create" }],
            enabled: true,
          },
          {
            title: "Get Paygrades",
            route: "/paygrade/get",
            patterns: [{ path: "/paygrade/get" }],
            enabled: true,
          },
        ],
      },
      {
        title: "Paybands",
        icon: <Banknote className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Payband",
            route: "/payband/create",
            patterns: [{ path: "/payband/create" }],
            enabled: true,
          },
          {
            title: "Get Paybands",
            route: "/payband/get",
            patterns: [{ path: "/payband/get" }],
            enabled: true,
          },
        ],
      },
       {
        title: "Allowances",
        icon: <Wallet className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Allowance",
            route: "/allowances/create",
            patterns: [{ path: "/allowances/create" }],
            enabled: true,
          },
          {
            title: "Get Allowances",
            route: "/allowances/get",
            patterns: [{ path: "/allowances/get" }],
            enabled: true,
          },
        ],
      },
      {
        title: "Pay Schedule",
        icon: <CalendarCheck2 className="w-4" />,
        enabled: true,
        subActions: [
          {
            title: "Create Pay Schedule",
            route: "/pay-schedules/create",
            patterns: [{ path: "/pay-schedules/create" }],
            enabled: true,
          },
          {
            title: "Get Pay Schedules",
            route: "/pay-schedules/get",
            patterns: [{ path: "/pay-schedules/get" }],
            enabled: true,
          },
        ],
      },
    ],
  },
 
 
];


const SideNavigationBar: React.FC<{
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleToggleSidebar = () => {
    toggleSidebar(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleSubmenuToggle = (title: string) => {
    setOpenSubmenu((prev) => (prev === title ? null : title));
  };
useEffect(() => {
  for (const navItem of navItems) {
    for (const action of navItem.actions) {
      if (action.subActions) {
        for (const sub of action.subActions) {
          const matches = sub.patterns?.some((pattern) =>
            location.pathname.startsWith(pattern.path)
          );
          if (matches) {
            setOpenSubmenu(action.title);
            return;
          }
        }
      }
    }
  }
}, [location.pathname]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black/30 cursor-pointer backdrop-blur-sm"
          onClick={handleToggleSidebar}
        />
      )}
      <div
        className={`custom__sidebar__scrollbar ${
          !isSidebarOpen ? "w-0" : "w-[280px]"
        } pb-20 md:pb-0 fixed top-0 bottom-0 z-20 md:left-0 md:w-[280px] h-[100dvh] bg-[#18212E] shadow-xl transition-all duration-75 ease-in-out overflow-y-auto`}
      >
        <div className="h-full w-full py-[18px] px-3 flex flex-col justify-start gap-3">
          <div className="mb-10">
            <img
              src={logos.PadeLogoWhite}
              alt="Pade Logo"
              className="w-[120px]"
            />
          </div>

          <div className="h-full w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-6">
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
                        openSubmenu={openSubmenu}
                        onSubmenuToggle={handleSubmenuToggle}
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
