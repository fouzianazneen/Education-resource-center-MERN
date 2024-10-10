import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://education-resource-center-mern.onrender.com',
  withCredentials: true, // Send cookies along with requests
});

export default instance;
