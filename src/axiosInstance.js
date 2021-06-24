import axios from 'axios';

const axiosInstance = axios.create({
    baseURL : 'http://3.141.21.117:8000/'
})

export default axiosInstance;