import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../components/api";

const initialMealState = {
  name: "",
  description: "",
  calorieIntake: 0,
  startDate: "",
  endDate: "",
  allMeals: [],
  error: null,
};

const fetchMeals = createAsyncThunk("fetchMeal/mealSlice", async () => {
  try {
    const meals = await api.get("/api/v1/meals", {
      headers: {
        auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
      },
    });
    return [...meals.data];
  } catch (error) {}
});

const updateMeal = createAsyncThunk(
  "updateMeal/mealSlice",
  async (
    { name, description, calorie_intake, start_date, end_date, id },
    { rejectWithValue }
  ) => {
    try {
      const meal = await api.patch(
        `/api/v1/meals/${id}`,
        { name, description, calorie_intake, start_date, end_date },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return meal.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addMeal = createAsyncThunk(
  "addMeal/mealSlice",
  async (
    { name, description, calorie_intake, start_date, end_date },
    { rejectWithValue }
  ) => {
    try {
      const meal = await api.post(
        "/api/v1/meals/",
        { name, description, calorie_intake, start_date, end_date },
        {
          headers: {
            auth_token: `${JSON.parse(localStorage.getItem("auth_token"))}`,
          },
        }
      );
      return meal.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState: initialMealState,
  reducers: {},
  extraReducers: {
    [fetchMeals.pending]: (state, action) => {},
    [fetchMeals.fulfilled]: (state, action) => {
      state.allMeals = action.payload;
    },
    [updateMeal.pending]: (state, action) => {},
    [updateMeal.fulfilled]: (state, action) => {},
    [updateMeal.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [addMeal.pending]: (state, action) => {},
    [addMeal.fulfilled]: (state, action) => {},
    [addMeal.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
  },
});

export { fetchMeals, updateMeal, addMeal };

export default mealSlice.reducer;
