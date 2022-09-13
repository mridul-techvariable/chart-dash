import axios from "./axios.global";

export const login = async (payload) => {
  try {
    let response = await axios.post("/api-login/", payload);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const logout = async () => {
  try {
    let response = await axios.post("/api-logout/");
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};
