import { EMPTY_OBJECT } from '../../utils/constants';
import axios from '../axios.global';
import AxiosSpark from '../axios.global.spark';
import { getPersistentAuthentication } from '../../utils/functions';

let token = getPersistentAuthentication()?.token;
const header = `Authorization:Token ${token}`;

export const setChartLayout = async (payload) => {
  try {
    let response = await axios.post(
      '/api-dashboard/dashboard-rearrange/',
      payload
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getChartLayout = async (id, layout) => {
  try {
    let response = EMPTY_OBJECT;
    if (layout) {
      response = await AxiosSpark.get(
        `/dashboard-render/?dashboard=${id}`)
        
      console.log('aaaddd', response);
      if ((response.data.message == 'No entry')) {
        response = await axios.get(
          `/api-dashboard/dashboard-render/?dashboard=${id}&layout=${true}`
        );
      }
    } else {
      response = await axios.get(
        `/api-dashboard/dashboard-render/?dashboard=${id}`
      );
    }

    return response.data;
  } catch (err) {
    console.log('aaaddd', err);
    return err?.response?.data;
  }
};

export const getChart = async (id) => {
  try {
    let response = await axios.get(`/api-dashboard/chart/get/?id=${id}`);
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getChartSaveStatus = async (id) => {
  try {
    let response = await AxiosSpark.get(
      `/dashboard/status/?dashboard_id=${id}`
    );
    return response.data;
  } catch (err) {
    return err?.response?.data;
  }
};
