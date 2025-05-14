import axios, { AxiosRequestConfig, Method } from "axios";
import FormData from "form-data";
import { URLSearchParams } from "url";

export interface RequestData {
  url: string;
  method: Method;
  payload?: any;
  query?: any;
  headers?: any;
}

export const makeRequest = async (requestData: RequestData) => {
  try {
    const options: AxiosRequestConfig = {
      url: requestData.query ? `${requestData.url}?${new URLSearchParams(requestData.query)}` : requestData.url,
      method: requestData.method,
      headers: {
        ...(!(requestData.payload instanceof FormData) && { "Content-Type": "application/json" }),
        ...(requestData.headers && requestData.headers)
      },
      ...(requestData.method !== "GET" && requestData.payload && { data: requestData.payload })
    };
    return (await axios(options)).data;
  } catch (error) {
    if (error?.response?.data) {
      console.log("Error Data ---- ", error?.response?.data || "");
      throw new Error(
        error?.response?.data?.message ||
          error?.response?.data?.error_message ||
          error?.response?.data?.error?.message ||
          (error?.response?.data?.error_msg
            ? `${error?.response?.data?.data?.error_msg} ${error?.response?.data?.extra?.error_detail}`
            : JSON.stringify(error.response.data))
      );
    } else {
      console.log(error);
      throw new Error(error.message);
    }
  }
};
