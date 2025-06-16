import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
  cartitem: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addTocart: (state, action) => {
      const existingitem = state.cartitem.find(
        (item) => item._id === action.payload._id
      );
      if (!existingitem) {
        state.cartitem.push(action.payload);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added to cart successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "Already added to cart",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartitem = state.cartitem.filter(item => item._id !== action.payload._id);
    },
    clearCart: (state) => {
      state.cartitem = [];
    },
  },
});

export const { addTocart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
