import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUser,
  login,
  logout,
  checkAuth,
  getCurrentUser,
} from "../services/LoginService";

interface loginInfo {
  username: string | undefined;
  password: string | undefined;
  confirmPass: string | undefined;
  isLoggedIn: boolean;
}
interface UserObj {
  username: string;
  password: string;
}
interface ReturnedUser {
  user: {username: string}
}
const initialState: loginInfo = {
  username: undefined,
  password: undefined,
  confirmPass: undefined,
  isLoggedIn: false,
};

//Thunks, these use functions imported from the loginService

export const logoutUser = createAsyncThunk("/api/auth/logout", async () => {
  const response = await logout();
  return response;
});

export const loginUser = createAsyncThunk(
  "api/auth/login",
  async (userObj: UserObj, thunkAPI) => {
    const { username, password } = userObj;
    try {
      const data = await login(username, password);
      return { username: data.username }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  "api/auth/check-auth",
  async (_, thunkAPI) => {
    
    try {
      const data = await checkAuth();
      return { username: data.username }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updateCofirmPass: (state, action) => {
      state.confirmPass = action.payload;
    },
    validateCreds: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const {
  updateUsername,
  updatePassword,
  updateCofirmPass,
  validateCreds,
} = loginSlice.actions;

export default loginSlice.reducer;
