import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'
import postReducer from '@/features/posts/postsSlice'
import usersReducer from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    auth: authReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>