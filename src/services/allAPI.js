import commonAPI from "./commonAPI";
import { server_url } from "./server_url";

// REGISTERAPI
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${server_url}/register`, reqBody);
}

// LOGINAPI
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${server_url}/login`, reqBody);
}

// GOOGLE LOGIN API
export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${server_url}/google-login`, reqBody);
}

// ADD APPLICATION (USER)
export const addApplicationAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST", `${server_url}/add`, reqBody, reqHeader);
};

// EDIT APPLICATION (USER)
export const editApplicationAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${server_url}/edit/${id}`,reqBody,reqHeader)
}

// GET SINGLE APPLICATION (USER)
export const getSingleApplicationAPI = async (id, reqHeader) => {
  return await commonAPI("GET", `${server_url}/single/${id}`, "", reqHeader);
};

// GET APPLICATIONS (USER)
export const getUserApplicationsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/user-apps`, "", reqHeader);
}

// DELETE APPLICATION (USER)
export const deleteApplicationAPI = async (id, headers) => {
  return await commonAPI("DELETE", `${server_url}/user/delete/${id}`, "", headers);
};

// GET PROFILE (USER)
export const getProfileAPI = async (reqHeader) => {
  return await commonAPI("GET", `${server_url}/get-profile`, "", reqHeader);
};

// UPDATE PROFILE (USER)
export const userUpdateProfileAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT", `${server_url}/user-profile`, reqBody, reqHeader);
};

// GET NOTIFICATIONS (USER)
export const getNotificationsAPI = async (header) => {
  return await commonAPI("GET", `${server_url}/get-notify`, "", header);
};

// MARK READ NOTIFICATIONS (USER)
export const markNotificationAPI = async (id, header) => {
  return await commonAPI("PUT", `${server_url}/put-notify/${id}`, {}, header);
};

// DELETE NOTIFICATION (USER)
export const deleteNotificationAPI = async (id, header) => {
  return await commonAPI("DELETE", `${server_url}/delete-notify/${id}`, "", header);
};

// CLEAR NOTIFICATIONS (USER)
export const clearNotificationsAPI = async (header) => {
  return await commonAPI("DELETE", `${server_url}/clear-notify`, "", header);
};

// GET ALL APPLICATIONS (ADMIN)
export const getAllApplicationsAPI = (headers) => {
  return commonAPI("GET", `${server_url}/all-apps`, "", headers);
};

// GET ALL USERS (ADMIN)
export const getAllUsersAPI = (headers) => {
  return commonAPI("GET", `${server_url}/all-users`, "", headers);
};

// UPDATE PROFILE (ADMIN)
export const updateProfileAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT", `${server_url}/admin-profile/${id}`, reqBody, reqHeader);
};

// UPDATE STATUS (ADMIN)
export const updateStatusAPI = async (id, body, headers) => {
  return await commonAPI("PUT", `${server_url}/update/${id}`, body, headers);
};

// DELETE APPLICATION (ADMIN)
export const deleteAdminApplicationAPI = async (id, headers) => {
  return await commonAPI("DELETE", `${server_url}/admin/delete/${id}`, "", headers);
};

// GET NOTIFICATIONS (ADMIN)
export const getAdminNotificationsAPI = async (header) => {
  return await commonAPI("GET", `${server_url}/admin-notify`, "", header);
}

// MARK READ NOTIFICATIONS(ADMIN)
export const markAdminNotificationAPI = async (id, header) => {
  return await commonAPI("PUT", `${server_url}/admin-put-notify/${id}`, {}, header);
}

// DELETE NOTIFICATION (ADMIN)
export const deleteAdminNotificationAPI = async (id, header) => {
  return await commonAPI("DELETE", `${server_url}/admin-delete-notify/${id}`, "", header);
}

// CLEAR NOTFICATIONS (ADMIN)
export const clearAdminNotificationsAPI = async (header) => {
  return await commonAPI("DELETE", `${server_url}/admin-clear-notify`, "", header);
};