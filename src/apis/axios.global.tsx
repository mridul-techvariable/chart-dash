import Axios from "axios";
// import { API_URL } from "../config";
// import { getPersistentAuthentication } from "../utils/functions";

let axios = Axios.create({
  baseURL: "/random-url",
});

axios.interceptors.request.use((config: any) => {
  // let token = getPersistentAuthentication()?.token;
  // if (token) {
  // config.headers.Authorization = `Token ${token}`;
  // }
  return config;
});

export default axios;
