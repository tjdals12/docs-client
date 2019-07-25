import axios from 'axios';

const real = 'http://192.168.7.9';

export const getDocuments = ({ page }) => axios.get(`${real}/api/documents?page=${page}`);
