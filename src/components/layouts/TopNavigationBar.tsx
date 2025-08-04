import {
  useLocation,
  useNavigate,
  useParams,
  matchRoutes,
  generatePath,
  RouteObject,
} from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeftIcon, ChevronRightIcon, ChevronUp, Menu } from "lucide-react";
import TextLink from "../ui/typography/LinkText";
import { logos } from "@/assets/logos";
import { Dropdown } from "antd";
import { P2 } from "../ui/typography";
import ImageComponent from "../ui/image";
import { images } from "@/assets/images";
import useAuthStore from "@/stores/auth/authStore";

type Page = { title: string; path: string; subPages?: Page[] };

const PAGES: Page[] = [
  { title: "Home", path: "/" },
  {
    title: "Companies",
    path: "/company",
    subPages: [
      { title: "Create Company",    path: "/company/create" },
      { title: "Get Companies",    path: "/company/get" },

    ],
  },
  {
    title: "Workplaces",
    path: "/workplace",
    subPages: [
      { title: "Create Workplace",    path: "/workplace/create" },
      { title: "Get Workplaces",    path: "/workplace/get" },

    ],
  },
  { title: "Create Paygrade", path: "/payroll/paygrades/create" },
  { title: "Create Payband", path: "/payroll/paybands/create" },
  { title: "Create Allowance", path: "/payroll/allowances/create" },
];

const pagesToRoutes = (nodes: Page[]): RouteObject[] =>
  nodes.map((p) => ({
    path: p.path,
    handle: { page: p },
    children: p.subPages ? pagesToRoutes(p.subPages) : undefined,
  }));

const ROUTES = pagesToRoutes(PAGES);

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore((state) => state);

  const handleSignout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="relative h-auto font-avenir">
      <div className="flex items-center gap-4 md:gap-6">
        <Dropdown
          trigger={["click"]}
          dropdownRender={() => (
            <div className="w-full p-4 bg-white rounded-lg drop-shadow-2xl border">
              <div className="flex flex-col w-full gap-5">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col w-full">
                    <P2 className="font-semibold text-neutral500 whitespace-nowrap">
                      {user?.firstName}
                    </P2>
                    <p className="text-neutral300 text-xs w-11/12">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-2 text-neutral50" />
              <button
                onClick={handleSignout}
                className="w-full rounded-[4px] flex gap-3 items-center px-1 py-2 text-neutral500 hover:bg-primary600 hover:text-white"
              >
                <P2>Log Out</P2>
              </button>
            </div>
          )}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <ImageComponent
              className="object-cover rounded-full border-[4px] border-primary50 w-7 h-7"
              src={images.DefaultProfilePicture}
              alt="User Profile"
            />
            <div className="hidden md:inline-flex flex-col">
              <P2 className="font-semibold text-neutral500">
                {user?.firstName} {user?.lastName}
              </P2>
            </div>
            <ChevronUp className="hidden md:inline-flex md:ml-2 rotate-180 w-4 stroke-[3px] text-neutral500" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export const TopNavigationBar: React.FC<{
  isSidebarOpen: boolean;
  toggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSidebarOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const params = useParams<Record<string, string>>();
  const navigate = useNavigate();

  const chain: Page[] = useMemo(() => {
    const m = matchRoutes(ROUTES, pathname) ?? [];
    return m.map((x) => x.route.handle!.page as Page);
  }, [pathname]);

  const isSubPage = chain.length > 1;

  return (
    <div className="flex items-center justify-between w-full h-full px-4 md:px-6 lg:px-10 mx-auto">
      <div className="flex gap-4 md:hidden">
        <img
          src={logos.PadeLogoNoName}
          alt="Pade Logo"
          width={30}
          height={30}
        />

        <button
          type="button"
          className="w-[27px]"
          onClick={() => {
            toggleSidebar(!isSidebarOpen);
            document.body.classList.add("overflow-hidden");
          }}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-4 items-center">
        {isSubPage && (
          <button
            type="button"
            className="hidden md:flex"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-2 text-neutral800" />
          </button>
        )}

        <div className="hidden md:flex items-center gap-2">
          {chain.map((page, idx) => {
            const isLast = idx === chain.length - 1;
            const to = generatePath(page.path, params);
            return (
              <span key={page.path} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-base font-semibold text-neutral700">
                    {page.title}
                  </span>
                ) : (
                  <>
                    <TextLink
                      to={to}
                      className="text-base font-semibold no-underline text-neutral700 hover:text-primary500"
                    >
                      {page.title}
                    </TextLink>
                    <ChevronRightIcon className="w-3.5 stroke-2 text-neutral900" />
                  </>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex-grow" />

      {/* User avatar / dropdown */}
      {/* <UserProfile /> */}
    </div>
  );
};
