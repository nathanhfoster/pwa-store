export const USER_ID_LOCAL_STORAGE_KEY = 'USER_ID_LOCAL_STORAGE_KEY';
export const USER_TOKEN_LOCAL_STORAGE_KEY = 'USER_TOKEN_LOCAL_STORAGE_KEY';
export const USER_MODE_LOCAL_STORAGE_KEY = 'USER_MODE_LOCAL_STORAGE_KEY';

export const setUserTokenAndIdLocalStorage = ({ id, token }) => {
  localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, id);
  localStorage.setItem(USER_TOKEN_LOCAL_STORAGE_KEY, token);
};

export const deleteUserLocalStorage = () => {
  localStorage.removeItem(USER_ID_LOCAL_STORAGE_KEY);
  localStorage.removeItem(USER_TOKEN_LOCAL_STORAGE_KEY);
  // localStorage.removeItem(USER_MODE_LOCAL_STORAGE_KEY);
};

export const setUserModeLocalStorage = ({ mode }) => {
  localStorage.setItem(USER_MODE_LOCAL_STORAGE_KEY, mode);
};
