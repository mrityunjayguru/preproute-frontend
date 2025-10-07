// apiClient.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Common function
export const apiRequest = async <T = any>(
  payload: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios({
      baseURL: "http://3.108.26.115:3100/common/get", // set your base API
      data:payload, // spread user payload (url, method, params, data, headers etc.)
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response?.data?.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with status other than 2xx
      throw error.response.data;
    } else if (error.request) {
      // Request was made but no response
      throw { message: "No response from server" };
    } else {
      // Something went wrong
      throw { message: error.message };
    }
  }
};
