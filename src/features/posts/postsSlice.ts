import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Post = {
  id: string
  title: string
  content: string
}

type PostsState = Post[]

const initialState: PostsState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state: PostsState, action: PayloadAction<Post>) {
      state.push(action.payload)
    },
  },
})

export const { postAdded } = postsSlice.actions
export default postsSlice.reducer
