import AdminConfig from "../config/config";

export const getToken: () => string = () => localStorage.getItem(AdminConfig.TOKEN_KEY) || '';

export const setToken = (token: string) => localStorage.setItem(AdminConfig.TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(AdminConfig.TOKEN_KEY);

interface ILocalStore {
  setValue(key: string, data: any): ILocalStore;

  getValue<T>(key: string, defaultValue?: T): T | null;

  removeValue(key: string): ILocalStore;
}

const LocalStore: ILocalStore = {
  setValue(key: string, data: any): ILocalStore {
    localStorage.setItem(key, stringify(data));
    return this;
  },
  getValue<T>(key: string, defaultValue?: T): T | null {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue || null;
    return parse<T>(value);
  },
  removeValue(key: string): ILocalStore {
    localStorage.removeItem(key);
    return this;
  },
};

function stringify(value: any): string {
  return JSON.stringify(value);
}

function parse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return null;
  }
}

export default LocalStore;
