import {createSlice} from '@reduxjs/toolkit';

const initialState = {value: []};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setSelectedItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSelectedItems} = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
