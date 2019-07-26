import axios from 'axios';

const real = 'http://192.168.7.9';

export const getDocuments = ({ page }) => axios.get(`${real}/api/documents?page=${page}`);
export const getDocument = ({ id }) => axios.get(`${real}/api/documents/${id}`);
export const addDocument = (document) => axios.post(`${real}/api/documents`, { ...document });
export const holdDocument = ({ id, yn, reason }) => axios.patch(`${real}/api/documents/${id}/hold`, { yn, reason });
export const deleteDocument = ({ id, yn, reason }) => axios.patch(`${real}/api/documents/${id}/delete`, { yn, reason });
