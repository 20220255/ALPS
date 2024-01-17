import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import custService from "./custService";

const initialState = {
  customers: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
  customer:null,
};

export const getAllCustomers = createAsyncThunk(
  "cust/getAllCustomers",
  async (thunkAPI) => {
    try {
      console.log('cust slice before going to service')
      return await custService.getAllCustomers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "cust/updateCustomer",
  async (updatedData, thunkAPI) => {
    try {
      return await custService.updateCustomer(updatedData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const custSlice = createSlice({
  name: "cust",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  
  // add cases
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.customers = null;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customer = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.customer = null;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = custSlice.actions;
export default custSlice.reducer;
