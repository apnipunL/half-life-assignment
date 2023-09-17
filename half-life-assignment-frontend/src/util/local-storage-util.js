
const ACCESS_TOKEN_KEY = 'access_token';
const USER_ID_KEY = 'user_id';

export const getLoggedUserId = () => {
    // return localStorage.getItem(USER_ID_KEY);
    return '1';
}

export const getLoggedUserAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const setLoggedUserId = (value) => {
    return localStorage.setItem(USER_ID_KEY, value);
}

export const setLoggedUserAccessToken = (value) => {
    return localStorage.setItem(ACCESS_TOKEN_KEY, value);
}
