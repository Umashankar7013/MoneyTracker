import {createSlice} from '@reduxjs/toolkit';

const initialState = {value: 'Veg Rolls'};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setCategory} = categorySlice.actions;
export default categorySlice.reducer;
