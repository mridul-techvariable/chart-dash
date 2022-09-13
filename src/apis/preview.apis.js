
import axios from "./axios.global";
import AxiosSpark from './axios.global.spark'

export const preview = async (payload) => {
  try {
    let response = await axios.get("/api-dashboard/get_token/");
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getChartData = async (id,token) => {
  try {
    let response = await AxiosSpark.get(`/dashboard-render/?dashboard=${id}&token=${token}`);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};





