import { getQueryString } from "../utils/functions";
import axios from "./axios.global";

export const tablesMeta = async (id) => {
  try {
    let response = await axios.get(`/api-dashboard/table_meta/?dump=${id}`);
    console.log("data", response);
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const tablesMapped = async (id) => {
  try {
    let response = await axios.get(`/api-dashboard/table/${id}/`);
    console.log("data", response);
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};


