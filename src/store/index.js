// store/index.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add other slices here as needed
  },
})
