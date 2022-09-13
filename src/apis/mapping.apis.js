
import axios from "./axios.global";

export const postMap= async (payload,tables,tableName) => {
  try {
    console.log('hhhiitt',tables.join(','))
    let response = await axios.post(`api-dashboard/mapping_relationship/?tables=${tables.join(',')}&table_name=${tableName}`,payload);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getMappings= async () => {
  try {
    let response = await axios.get("api-dashboard/mapping_relationship/");
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getMappingTable= async (id) => {
  try {
    let response = await axios.get(`api-dashboard/get_mapped_table/?dump=${id}`);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getMappedTableIdStatus = async (id) => {
  try {
    let response = await axios.get(`api-dashboard/get_mapped_table/?dump=${id}`);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getMappedTables = async (id) => {
  try {
    let response = await axios.get(`api-dashboard/table/get_non_dump_tables/`);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};

export const getAllTablesName= async () => {
  try {
    let response = await axios.get(`api-dashboard/table/?fields=table_name`);
    return response?.data;
  } catch (err) {
    return err?.response?.data;
  }
};





