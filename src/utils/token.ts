import AdminConfig from "../config/config";

export const getToken: () => string = () => localStorage.getItem(AdminConfig.TOKEN_KEY) || '';

export const setToken = (token: string) => localStorage.setItem(AdminConfig.TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(AdminConfig.TOKEN_KEY);
