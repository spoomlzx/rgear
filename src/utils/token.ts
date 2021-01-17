const TokenKey = 'Gear-Token';

export const getToken: () => string = () => localStorage.getItem(TokenKey) || '';

export const setToken = (token: string) => localStorage.setItem(TokenKey, token);

export const removeToken = () => localStorage.removeItem(TokenKey);
