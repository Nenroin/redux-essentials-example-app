import { configureStore } from '@reduxjs/toolkit'
import postReducer from '@/features/posts/postsSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
