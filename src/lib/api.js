import axios from 'axios';

const real = 'http://192.168.7.9';

/** Document */
export const getDocuments = ({ page }) => axios.get(`${real}/api/documents?page=${page}`);
export const searchDocuments = (page, param) => axios.post(`${real}/api/documents/search?page=${page}`, { ...param });
export const getDocument = ({ id }) => axios.get(`${real}/api/documents/${id}`);
export const addDocument = (document) => axios.post(`${real}/api/documents`, { ...document });
export const holdDocument = ({ id, yn, reason }) => axios.patch(`${real}/api/documents/${id}/hold`, { yn, reason });
export const deleteDocument = ({ id, yn, reason }) => axios.patch(`${real}/api/documents/${id}/delete`, { yn, reason });
export const deleteDocuments = (ids, page) => axios.patch(`${real}/api/documents/delete?page=${page}`, { ids: ids });
export const editDocument = ({ id, document }) => axios.patch(`${real}/api/documents/${id}/edit`, { ...document });
export const inOutDocument = (id, param) => axios.patch(`${real}/api/documents/${id}/inout`, { ...param });
export const deleteInOutDocument = ({ id, target }) =>
	axios.patch(`${real}/api/documents/${id}/inout/delete`, { targetId: target });

/** Vendor */
export const getVendors = ({ page }) => axios.get(`${real}/api/vendors?page=${page}`);
export const getVendorsForSelect = () => axios.get(`${real}/api/vendors/forselect`);
export const searchVendors = (page, param) => axios.post(`${real}/api/vendors/search?page=${page}`, { ...param });
export const getVendor = ({ id }) => axios.get(`${real}/api/vendors/${id}`);
export const addVendor = (vendor) => axios.post(`${real}/api/vendors`, { ...vendor });
export const editVendor = ({ id, vendor }) => axios.patch(`${real}/api/vendors/${id}/edit`, { ...vendor });
export const deleteVendor = ({ id }) => axios.patch(`${real}/api/vendors/${id}/delete`);
export const addPerson = ({ id, persons }) => axios.post(`${real}/api/vendors/${id}/add`, { persons });

/** Cmcode */
export const getCmcodeByMajor = ({ major }) => axios.get(`${real}/api/cmcodes/${major}/minors`);

/** indexes */
export const getIndexes = ({ page }) => axios.get(`${real}/api/documentindex?page=${page}`);
