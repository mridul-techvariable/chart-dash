
import axios from "./axios.global";

export const databases = async (id) => {
  try {
    let response = ''
    if(id){
      response = await axios.get(`/api-dashboard/dumps/${id}/`);
    }
    else{
      response = await axios.get("/api-dashboard/dumps/");
    }
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const dataPreview = async (id,page) => {
  try {
    let response = await axios.get(`/api-dashboard/sample_data_download/?table_id=${id}&page=${page}`);
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const dumpStatus = async (payload) => {
  try {
    let response = await axios.get("/api-dashboard/dump_status/");
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};




