import { Outlet, ScrollRestoration } from "react-router-dom";
import queryClient from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ConfigProvider } from "antd";
// import { ThemeProvider } from "./hooks/useTheme"

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#004AF5",
            },
          }}
        >
          <Outlet />
        </ConfigProvider>
      </QueryClientProvider>
      <Toaster />
      <ScrollRestoration />
    </>
  );
}

export default App;
