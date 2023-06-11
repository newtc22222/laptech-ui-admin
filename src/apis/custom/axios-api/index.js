import axios from 'axios';
import { BASE_URL } from '../../config';

const AxiosAPI = axios.create({
  baseURL: BASE_URL
});

export default AxiosAPI;
