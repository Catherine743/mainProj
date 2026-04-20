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
