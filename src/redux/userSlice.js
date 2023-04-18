import {createSlice} from '@reduxjs/toolkit';

const initialState = {value: {}};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {userDetails} = userSlice.actions;
export default userSlice.reducer;
