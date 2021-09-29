import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/post/postSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer
  },
});
