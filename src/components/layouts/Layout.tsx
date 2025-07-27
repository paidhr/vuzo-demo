import React, { Suspense, useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { TopNavigationBar } from "./TopNavigationBar";
import SideNavigationBar from "./SideNavigationBar";
// import useAuthStore from "@/stores/auth/authStore";

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, toggleSidebar] = useState(false);
  // const navigate = useNavigate();

  // const { isAuthenticated } = useAuthStore();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/auth/login", { replace: true });
  //   }
  // }, [isAuthenticated]);

  return (
    <Layout>
      <SideNavigationBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Layout>
        <Header className="bg-white p-0 sticky top-0 z-10 w-full border-b md:pl-[280px] h-[70px]">
          <TopNavigationBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </Header>
        <Content className=" ">
          <div className=" bg-contentBg min-h-dvh md:pl-[280px] font-avenir admin__layout">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

function Loading() {
  return (
    <div
      className="fixed right-0 top-20 bottom-0 md:left-[280px]  flex justify-center items-center h-[calc(100vh-80px)] bg-white"
      style={{
        zIndex: 9999999,
      }}
    >
      <Spin />
    </div>
  );
}
