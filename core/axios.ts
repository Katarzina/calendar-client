import axios from "axios";
import { parseCookies } from "nookies";
import * as process from "process";

//axios.defaults.baseURL = process.env.BACKEND_API;
axios.defaults.baseURL = "http://localhost:7777";

axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { _token } = parseCookies();

    config.headers.Authorization = "Bearer " + _token;
  }

  return config;
});

export default axios;
