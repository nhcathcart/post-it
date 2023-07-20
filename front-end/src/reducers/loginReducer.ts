import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUser,
  login,
  logout,
  checkAuth,
  getCurrentUser,
} from "../services/loginService";

interface loginInfo {
  username: string;
  password: string;
  confirmPass: string;
  isLoggedIn: boolean;
}
interface UserObj {
  username: string;
  password: string;
}
interface ReturnedUser {
  user: { username: string };
}
const initialState: loginInfo = {
  username: "",
  password: "",
  confirmPass: "",
  isLoggedIn: false,
};

//Thunks, these use functions imported from the loginService

export const logoutUser = createAsyncThunk(
  "/api/auth/logout",
  async (_, thunkAPI) => {
    const response = await logout();
    if (response === "successful logout") {
      thunkAPI.dispatch(invalidateCreds());
      window.location.reload();
      return response;
    }
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "/api/auth/login",
  async (userObj: UserObj, thunkAPI) => {
    const { username, password } = userObj;
    try {
      const data = await login(username, password);
      if (!data.username) throw "unauthorized";
      thunkAPI.dispatch(validateCreds());
      return { username: data.username };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewUser = createAsyncThunk(
  "/api/auth/create-user",
  async (userObj: UserObj, thunkAPI) => {
    const { username, password } = userObj;
    try {
      const data = await createUser(username, password);
      thunkAPI.dispatch(validateCreds());
      return { username: data.username };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  "/api/auth/check-auth",
  async (_, thunkAPI) => {
    try {
      const data = await checkAuth();

      if (data.err) {
        throw "unauthorized";
      }
      thunkAPI.dispatch(validateCreds());
      return { username: data.username };
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
    invalidateCreds: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  updateUsername,
  updatePassword,
  updateCofirmPass,
  validateCreds,
  invalidateCreds,
} = loginSlice.actions;

export default loginSlice.reducer;
