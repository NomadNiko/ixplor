import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://ixplor.onrender.com';
axios.defaults.withCredentials = true;