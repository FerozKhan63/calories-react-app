import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../components/api";

const initialAuthState = {
  isAuthenticated: false,
  authToken: "",
};

const login = createAsyncThunk(
  "login/authSlice",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = await api.post("/api/v1/session/", { email, password });

      return auth.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const signup = createAsyncThunk(
  "signup/authSlice",
  async (
    { email, password, first_name, last_name, password_confirmation },
    { rejectWithValue }
  ) => {
    try {
      const register = await api.post("/api/v1/session/signup", {
        email,
        password,
        first_name,
        last_name,
        password_confirmation,
      });
      return register.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload.auth_token;
      localStorage.setItem("is_logged_in", true);
      localStorage.setItem(
        "auth_token",
        JSON.stringify(action.payload.auth_token)
      );
    },
    [login.rejected]: (state, action) => {},
    [signup.pending]: (state, action) => {},
    [signup.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload.auth_token;
      localStorage.setItem("is_logged_in", true);
      localStorage.setItem(
        "auth_token",
        JSON.stringify(action.payload.auth_token)
      );
    },
    [signup.rejected]: (state, action) => {},
  },
});

export const authActions = authSlice.actions;

export { login, signup };

export default authSlice.reducer;
