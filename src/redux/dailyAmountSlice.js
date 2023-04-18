import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Models} from '../model/FireBaseModel';

const initialState = {value: {dailyAmount: {}, totalAmount: {}}};

// export const fetchDailyAmountData = createAsyncThunk(
//   'dailyAmount',
//   async thunkApi => {
//     const user = thunkApi.getState().user.value;
//     const response = await Models.dataStore.getTotalData(user?.displayName);
//     return response || {};
//   },
// );

// export const fetchDailyTotalAmountData = createAsyncThunk(
//   'dailyTotalAmount',
//   async thunkApi => {
//     const user = thunkApi.getState().user.value;
//     const response = await Models.totalAmount.getTotalData(user?.displayName);
//     return response || {};
//   },
// );

export const dailyAmountSlice = createSlice({
  name: 'dailyAmount',
  initialState,
  reducers: {
    dailyAmount: (state, action) => {
      state.value.dailyAmount = action.payload;
    },
    dailyTotalAmount: (state, action) => {
      state.value.totalAmount = action.payload;
    },
  },
  //   extraReducers: builder => {
  //     // Add reducers for additional action types here, and handle loading state as needed
  //     builder
  //       .addCase(fetchDailyAmountData.fulfilled, (state, action) => {
  //         state.value.dailyAmount = action.payload;
  //       })
  //       .addCase(fetchDailyTotalAmountData.fulfilled, (state, action) => {
  //         state.value.totalAmount = action.payload;
  //       });
  //   },
});

export const {dailyAmount, dailyTotalAmount} = dailyAmountSlice.actions;
export default dailyAmountSlice.reducer;
