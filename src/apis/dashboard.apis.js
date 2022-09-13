import axios from "./axios.global";

export const createNewDashboard = async (payload) => {
  try {
    let response = await axios.post("/api-dashboard/dashboard/", payload);
    console.log('resp',)
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getDashboards = async () => {
  try {
    let response = await axios.get("/api-dashboard/dashboard/");
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const publishCharts = async (payload = []) => {
  try {
    let response = await axios.post("/api-dashboard/chart/save/", payload);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getCharts = async () => {
  try {
    let response = await axios.get("/api-dashboard/charts/");
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const deleteChart = async (id) => {
  try {
    let response = await axios.get(`/api-dashboard/chart/delete/?id=${id}`);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};
