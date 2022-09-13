import { EMPTY_STRING } from '../utils/constants';
import axios from './axios.global';
import AxiosSpark from './axios.global.spark';

export const queryFunctions = async (token) => {
  try {
    let response = '';
    if (token) {
      response = await axios.get(
        `/api-dashboard/queryfunctions/?token=${token}`
      );
    } else {
      response = await axios.get('/api-dashboard/queryfunctions/');
    }

    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const chartQuery = async (payload, token) => {
  let response = EMPTY_STRING;
  console.log({ token });
  try {
    if (token) {
      response = await axios.post(
        `/api-dashboard/chart/query/?token=${token}`,
        payload
      );
    } else {
      response = await axios.post('/api-dashboard/chart/query/', payload);
    }

    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const fieldValues = async (id, token) => {
  try {
    let response = '';
    if (token) {
      response = await axios.get(
        `/api-dashboard/field/?table=${id}&token=${token}`
      );
    } else {
      console.log('axd', id);
      response = await axios.get(`/api-dashboard/field/?table=${id}`);
    }

    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const editFieldValues = async (payload,id) => {
  try {
    let response = '';
      console.log('axd', id);
      response = await axios.patch(`/api-dashboard/field/${id}/`,payload);
    return response;
  } catch (err) {
    return err?.response?.data;
  }
};

export const processQuery = async (
  payload,
  page,
  resultId,
  token,
  isSpark,
  isPagination
) => {
  console.log('token', payload, page, resultId, token);
  let response = '';
  try {
    if (isSpark) {
      if (isPagination) {
        if (token) {
          response = await AxiosSpark.post(
            `/process_query/?page=${page}&result_id=${resultId}&token=${token}`,
            {}
          );
        } else {
          response = await AxiosSpark.post(
            `/process_query/?page=${page}&result_id=${resultId}`,
            {}
          );
        }
      } else {
        if (token) {
          response = await AxiosSpark.post(
            `/process_query/?token=${token}`,
            payload
          );
        } else {
          response = await AxiosSpark.post('/process_query/', payload);
        }
      }
      return response.data;
    }
    // if(resultId){
    //   if(token ){
    //     if(payload){
    //       payload.result_id=resultId
    //       response = await axios.post(`/api-dashboard/process_query/?page=${page}&token=${token}`,payload);
    //     }
    //     else{
    //       response = await axios.post(`/api-dashboard/process_query/?page=${page}&result_id=${resultId}&token=${token}`);
    //     }

    //   }
    //   else{

    //     if(payload){
    //       payload.result_id=resultId
    //       response = await axios.post(`/api-dashboard/process_query/?page=${page}`,payload);
    //     }
    //     else{
    //       response = await axios.post(`/api-dashboard/process_query/?page=${page}&result_id=${resultId}`,payload);
    //     }

    //   }

    //
    // }
    else {
      if (token) {
        response = await axios.post(
          `/api-dashboard/process_query/?token=${token}`,
          payload
        );
      } else {
        response = await axios.post("/api-dashboard/process_query/", payload);
      }

      return response.data;
    }
    // if(sortValue){
    //   let response = await axios.post(`/api-dashboard/process_query/?sortby=${sortValue}`);
    //   return response.data;
    // }
  } catch (err) {
    return err?.response?.data;
  }
};
