import axios from "axios";

const baseDomain = 'http://bomber.local';
const baseUrl = `${baseDomain}/api`;
const token = localStorage.getItem('token');
export default axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: 'Bearer ' + `${token}`
  }
})
