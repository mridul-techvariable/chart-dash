
import axios from "./axios.global";

export const tilesFunctions = async (payload) => {
  try {
    let response = await axios.get("api-dashboard/tilesfunctions/");
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};




