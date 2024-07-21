import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listCart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.listCart.find(i => i._id.$oid === item._id.$oid);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.listCart.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state.listCart));
    },
    updateCart: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.listCart.find(i => i._id.$oid === _id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.listCart));
    },
    deleteCart: (state, action) => {
      state.listCart = state.listCart.filter(i => i._id.$oid !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.listCart));
    },
  },
});

export const { addCart, updateCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
