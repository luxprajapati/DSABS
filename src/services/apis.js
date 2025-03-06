const BASE_URL = process.env.REACT_APP_BASE_URI;
console.log("BASE_URL", BASE_URL);

// AuthEndpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

// UserEndpoints
export const userEndpoints = {
    
}