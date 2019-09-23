import axios from 'axios';

// const real = 'http://192.168.7.9';
const real = '';

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

/** Index */
export const getIndexes = ({ page }) => axios.get(`${real}/api/documentindexes?page=${page}`);
export const getIndexesForSelect = () => axios.get(`${real}/api/documentindexes/forselect`);
export const searchIndexes = (page, param) =>
	axios.post(`${real}/api/documentindexes/search?page=${page}`, { ...param });
export const getIndex = ({ id }) => axios.get(`${real}/api/documentindexes/${id}`);
export const getIndexOverall = ({ id }) => axios.get(`${real}/api/documentindexes/${id}/overall`);
export const getStatisticsByStatus = ({ id }) => axios.get(`${real}/api/documentindexes/${id}/statisticsbystatus`);
export const getTrackingDocument = ({ id, page }) =>
	axios.get(`${real}/api/documentindexes/${id}/trackingdocument?page=${page}`);
export const addIndex = (param) => axios.post(`${real}/api/documentindexes`, { ...param });
export const addPartial = ({ id, list }) => axios.patch(`${real}/api/documentindexes/${id}/add`, { list });
export const editIndex = (id, param) => axios.patch(`${real}/api/documentindexes/${id}/edit`, { ...param });
export const deleteIndex = ({ id }) => axios.patch(`${real}/api/documentindexes/${id}/delete`);

/** Index -> Info */
export const getInfos = ({ page }) => axios.get(`${real}/api/documentinfos?page=${page}`);
export const searchInfos = (page, param) => axios.post(`${real}/api/documentinfos/search?page=${page}`, { ...param });
export const getInfo = ({ id }) => axios.get(`${real}/api/documentinfos/${id}`);

/** Vendor Letter */
export const getVendorLetters = ({ page }) => axios.get(`${real}/api/vendorletters?page=${page}`);
export const getVendorLettersByVendor = ({ vendor }) => axios.get(`${real}/api/vendorletters/${vendor}/letters`);
export const statisticsByTransmittal = ({ vendor }) =>
	axios.get(`${real}/api/vendorletters/${vendor}/statisticsbytransmittal`);
export const searchVendorLetters = (page, param) =>
	axios.post(`${real}/api/vendorletters/search?page=${page}`, { ...param });
export const getVendorLetter = ({ id }) => axios.get(`${real}/api/vendorletters/${id}`);
export const receiveVendorLetter = (param) => axios.post(`${real}/api/vendorletters`, { ...param });
export const editVendorLetter = ({ id, param }) => axios.patch(`${real}/api/vendorletters/${id}/edit`, { ...param });
export const additionalReceiveVendorLetter = ({ id, param }) =>
	axios.patch(`${real}/api/vendorletters/${id}/add`, { receiveDocuments: param });
export const deleteVendorLetter = ({ id, yn, reason }) =>
	axios.patch(`${real}/api/vendorletters/${id}/delete`, { yn, reason });
export const inOutVendorLetter = (id, param) => axios.patch(`${real}/api/vendorletters/${id}/inout`, { ...param });
export const deleteInOutVendorLetter = ({ id, target }) =>
	axios.patch(`${real}/api/vendorletters/${id}/inout/delete`, { targetId: target });

/** Letter */
export const getLetters = ({ page }) => axios.get(`/api/letters?page=${page}`);
export const searchLetters = (page, param) => axios.post(`/api/letters/search?page=${page}`, { ...param });
export const getLetter = ({ id }) => axios.get(`${real}/api/letters/${id}`);
export const addLetter = (param) => axios.post(`${real}/api/letters`, { ...param });
export const referenceSearch = ({ keyword }) => axios.get(`${real}/api/letters/ref/search?keyword=${keyword}`);
export const editLetter = ({ id, param }) => axios.patch(`${real}/api/letters/${id}/edit`, { ...param });
export const cancelLetter = ({ id, yn, reason }) => axios.patch(`${real}/api/letters/${id}/cancel`, { yn, reason });

/** Project */
export const getProjects = ({ page }) => axios.get(`/api/projects?page=${page}`);
export const getProject = ({ id }) => axios.get(`/api/projects/${id}`);
