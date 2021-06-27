import axios from 'axios';
import baseURL from './baseURL';

const axiosInstance = axios.create({
    baseURL : baseURL
})

export default axiosInstance;