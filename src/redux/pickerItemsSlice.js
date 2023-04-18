import {createSlice} from '@reduxjs/toolkit';

const initialState = {value: {vegRolls: 'Veg Rolls'}};

export const pickerItemsSlice = createSlice({
  name: 'pickerItems',
  initialState,
  reducers: {
    setpickerItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setpickerItems} = pickerItemsSlice.actions;
export default pickerItemsSlice.reducer;
