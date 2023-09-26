import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constants";
//api client from axios , can be use any other library
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 0,
});
export { AxiosError };
export default apiClient;
