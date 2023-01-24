import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../components/api";

const fetchUser = createAsyncThunk("fetchUser/profileSlice", async () => {
  try {
    const profile = await api.get("/api/v1/users/show_profile", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });

    return profile.data;
  } catch (error) {}
});

const editUser = createAsyncThunk(
  "editUser/profileSlice",
  async ({ first_name, last_name, calorie_limit }, { rejectWithValue }) => {
    try {
      const profile = await api.patch(
        "/api/v1/users/",
        { first_name, last_name, calorie_limit },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );

      return profile.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialProfileState = {
  firstName: "",
  lastName: "",
  email: "",
  profileData: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state, action) => {},
    [fetchUser.fulfilled]: (state, action) => {
      state.profileData = action.payload;
    },
    [editUser.pending]: (state, action) => {},
    [editUser.fulfilled]: (state, action) => {
      state.profileData = action.payload;
    },
    [editUser.rejected]: (action, state) => {},
  },
});

export { fetchUser, editUser };

export default profileSlice.reducer;
