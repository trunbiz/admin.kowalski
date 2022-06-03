import axios from "axios";

const baseDomain = process.env.VUE_APP_API_URL;
const baseUrl = `${baseDomain}/api`;
const token = localStorage.getItem('token');
export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: 'Bearer ' + `${token}`
  }
})
