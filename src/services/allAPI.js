import commonAPI from "./commonAPI";
import { server_url } from "./server_url";

// registerAPI
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${server_url}/register`, reqBody);
}

// loginAPI
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${server_url}/login`, reqBody);
}

// googleLoginAPI
export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${server_url}/google-login`, reqBody);
}

// ADD APPLICATION
export const addApplicationAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/add`, reqBody, reqHeader);
};

// PROFILE
export const getProfileAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/get-profile`, "", reqHeader);
};

// UPDATE PROFILE (ADMIN)
export const updateProfileAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${server_url}/admin-profile/${id}`, reqBody, reqHeader);
};

// UPDATE PROFILE 
export const userUpdateProfileAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT", `${server_url}/user-profile`, reqBody, reqHeader);
};

// USER APPLICATIONS
export const getUserApplicationsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/user-apps`, "", reqHeader);
}

// ALL APLLICATIONS (ADMIN)
export const getAllApplicationsAPI = (headers) => {
  return commonAPI("GET", `${server_url}/all-apps`, "", headers);
};

// ALL USERS (ADMIN)
export const getAllUsersAPI = (headers) => {
  return commonAPI("GET", `${server_url}/all-users`, "", headers);
};

// GET SINGLE APPLICATION
export const getSingleApplicationAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${server_url}/single/${id}`, "", reqHeader);
};

// EDIT APPLICATION
export const editApplicationAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${server_url}/edit/${id}`,reqBody,reqHeader)
}

// UPDATE STATUS
export const updateStatusAPI = async (id, body, headers) => {
  return await commonAPI("PUT", `${server_url}/update/${id}`, body, headers);
};

// DELETE
export const deleteApplicationAPI = async (id, headers) => {
  return await commonAPI("DELETE", `${server_url}/user/delete/${id}`, "", headers);
};

// DELETE (ADMIN)
export const deleteAdminApplicationAPI = async (id, headers) => {
  return await commonAPI("DELETE", `${server_url}/admin/delete/${id}`, "", headers);
};

// GET NOTIFICATIONS
export const getNotificationsAPI = async (header) => {
  return await commonAPI("GET", `${server_url}/get-notify`, "", header);
};

// MARK NOTIFICATION AS READ
export const markNotificationAPI = async (id, header) => {
  return await commonAPI("PUT", `${server_url}/put-notify/${id}`, {}, header);
};

// DELETE NOTIFICATION
export const deleteNotificationAPI = async (id, header) => {
  return await commonAPI("DELETE", `${server_url}/delete-notify/${id}`, "", header);
};

// CLEAR ALL NOTIFICATIONS
export const clearNotificationsAPI = async (header) => {
  return await commonAPI("DELETE", `${server_url}/clear-notify`, "", header);
};

// GET ALL NOTIFICATIONS (ADMIN)
export const getAdminNotificationsAPI = async (header) => {
  return await commonAPI("GET", `${server_url}/admin-notify`, "", header);
}

// CLEAR ALL NOTFICATIONS (ADMIN)
export const clearAdminNotificationsAPI = async (header) => {
  return await commonAPI("DELETE", `${server_url}/admin-clear-notify`, "", header);
};

// MARK AS READ (ADMIN)
export const markAdminNotificationAPI = async (id, header) => {
  return await commonAPI("PUT", `${server_url}/admin-put-notify/${id}`, {}, header);
}

// DELETE SINGLE (ADMIN)
export const deleteAdminNotificationAPI = async (id, header) => {
  return await commonAPI("DELETE", `${server_url}/admin-delete-notify/${id}`, "", header);
}