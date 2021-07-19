import axios from "axios";

const config = axios.create({
    baseURL: 'http://localhost:3002/'
   });
    
   config.interceptors.request.use(function (config) {
    
    const authData = localStorage.getItem("Auth");
    if (authData) {
    const token = JSON.parse(authData)['accessToken'];
    config.headers['Authorization'] = 'Bearer ' + token;
     }
    
    return config;
   });
    
   export default config;