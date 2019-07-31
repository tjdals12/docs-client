import axios from 'axios';

const real = 'http://192.168.7.9';

/** Document */
export const getDocuments = ({ page }) => axios.get(`${real}/api/documents?page=${page}`);
export const getDocument = ({ id }) => axios.get(`${real}/api/documents/${id}`);
export const addDocument = (document) => axios.post(`${real}/api/documents`, { ...document });
export const holdDocument = ({ id, yn, reason }) => axios.patch(`${real}/api/documents/${id}/hold`, { yn, reason });
export const deleteDocument = ({ id, yn, reason }) => axios.patch(`${real}/api/documents/${id}/delete`, { yn, reason });
export const editDocument = ({ id, document }) => axios.patch(`${real}/api/documents/${id}/edit`, { ...document });
export const inOutDocument = (id, param) => axios.patch(`${real}/api/documents/${id}/inout`, { ...param });
export const deleteInOutDocument = ({ id, target }) =>
	axios.patch(`${real}/api/documents/${id}/inout/delete`, { targetId: target });

/** Cmcode */
export const getCmcodeByMajor = ({ major }) => axios.get(`${real}/api/cmcodes/${major}/minors`);
