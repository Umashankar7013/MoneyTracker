import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dailyAmountReducer from './dailyAmountSlice';
import selectedItemsReducer from './selectedItemsSlice';
import pickerItemReducer from './pickerItemsSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dailyAmount: dailyAmountReducer,
    selectedItems: selectedItemsReducer,
    pickerItems: pickerItemReducer,
    category: categoryReducer,
  },
});
