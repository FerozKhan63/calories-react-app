import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import mealSlice from "./meal-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: { auth: authSlice, profile: userSlice, meals: mealSlice },
});

export default store;
