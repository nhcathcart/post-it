import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface loginInfo {
  username: string | undefined;
  password: string | undefined;
  confirmPass: string | undefined;
  isLoggedIn: boolean
}

const initialState: loginInfo = {
  username: undefined,
  password: undefined,
  confirmPass: undefined,
  isLoggedIn: false,
}

export const logoutUser = createAsyncThunk('/api/auth/logout', async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include', // Include credentials for handling cookies/sessions
  })

  if (!response.ok) {
    // Handle any logout failure (optional)
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  console.log('here')
  let responseText = await response.text()
  console.log(responseText)
  return {};
});
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload
    },
    updatePassword: (state, action) => {
      state.password = action.payload
    },
    updateCofirmPass: (state, action) => {
      state.confirmPass = action.payload
    },
    validateCreds: (state) => {
      state.isLoggedIn = true;
    }
  },
})

export const { updateUsername, updatePassword, updateCofirmPass, validateCreds } = loginSlice.actions

export default loginSlice.reducer