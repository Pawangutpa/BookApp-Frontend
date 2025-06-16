import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './feature/cart/carSlice';
import booksApi from './feature/books/booksAPi';
import ordersApi from './feature/orders/orders.Api';
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    [booksApi.reducerPath]:booksApi.reducer,
    [ordersApi.reducerPath]:ordersApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(booksApi.middleware,ordersApi.middleware),
  
})