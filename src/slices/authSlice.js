import { createSlice } from "@reduxjs/toolkit";

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  try {
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error parsing token from localStorage", error);
    return null;
  }
};

const initialState = {
  // token: localStorage.getItem("token")
  //   ? JSON.parse(localStorage.getItem("token"))
  //   : null,
  token: getTokenFromLocalStorage(),
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setToken: (state, action) => {
      console.log("Setting token in state:", action.payload);
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
