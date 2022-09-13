
import axios from "./axios.global";

export const fileUpload = async (payload) => {
  try {
    let response = await axios.post("/api-dashboard/dumps/",payload);
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const fileUploadEdit = async (payload,id) => {
  try {
    let response = await axios.patch(`/api-dashboard/dumps/${id}/`,payload);
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};




