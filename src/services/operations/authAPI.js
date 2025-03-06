import {setLoading, setToken} from "../../slices/authSlice";
import { endpoints } from "../apis";
import {apiConnector} from "../apiconnector";
import toast from "react-hot-toast";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
  } = endpoints;
  

export function sentotp(email, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        });
  
        // console.log("SENDOTP_API RESPONSE...............", response);
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        toast.success("OTP Sent Successfully");
        navigate("/verify-otp");
      } catch (err) {
        console.log("SENDOTP_API ERROR..................", err);
        toast.error("Failed to Send OTP");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }

  export function signup(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      console.log("Account type in authAPI:--", accountType);
      try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      console.log("SIGNUP_API RESPONSE...............", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        toast.success("Signup Successful");
        navigate("/login");
      } catch (err) {
        console.log("SIGNUP_API ERROR..................", err);
        toast.error("Failed to Signup. Please try again");
        navigate("/signup");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }

  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        });
        // console.log("LOGIN_API RESPONSE...............", response);
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        toast.success("Login Successful");
        console.log("token in email login:- ", response.data);
        dispatch(setToken(response.data.token));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      } catch (err) {
        console.log("LOGIN_API ERROR..................", err);
        toast.error("Failed to Login");
      }
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }


  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null));
      localStorage.removeItem("token");
      toast.success("Logged Out");
      navigate("/");
    };
  }