import axios from "axios";
import useAuthStore from "@/stores/auth/authStore";
import { baseUrl } from "@/constants";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const axiosPrivateInstance = axios.create({
  baseURL: baseUrl,
});

axiosPrivateInstance.interceptors.request.use(
  async (config) => {
    const integration = useAuthStore.getState().integration;

    const authHeader = `Bearer ${
      integration?.keys?.find(
        (key) => key.key.type === "secret" && key.key.mode === "test"
      )?.key?.value
    }`;

    const {
      accessToken,
      //  refreshToken, setTokens,
      // logout,
    } = useAuthStore.getState();
    if (accessToken) {
      config.headers["access_token"] = `${accessToken}`;
      config.headers["Authorization"] = authHeader;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivateInstance.interceptors.response.use(
  async (response) => {
    const {
      //  accessToken, refreshToken, setTokens, clearTokens,
      logout,
    } = useAuthStore.getState();
    if (response.status === 401) {
      logout();
      return response;
    }
    return response;
  },
  (error) => {
    const {
      // accessToken, refreshToken, setTokens, clearTokens,
      logout,
    } = useAuthStore.getState();
    if (error.response.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

export { axiosInstance, axiosPrivateInstance };
