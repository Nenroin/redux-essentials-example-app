import { nanoid } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

export type Post = {
  id: string
  date: string
  title: string
  content: string
  userId: string
}
type PostUpdate = Omit<Post, 'userId' | 'date'>

export type PostsState = Post[]

const initialState: PostsState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    userId: '0',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: '2',
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state: PostsState, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId,
          },
        }
      },
    },
    postUpdated(state: PostsState, action: PayloadAction<PostUpdate>) {
      const { id } = action.payload
      const existingPost: Post | undefined = state.find((e) => e.id === id)

      if (existingPost) {
        ;(Object.keys(existingPost) as (keyof PostUpdate)[]).forEach((key) => {
          if (key !== id && existingPost[key] !== action.payload[key]) {
            existingPost[key] = action.payload[key]
          }
        })
      }
    },
  },
  selectors: {
    selectAllPosts: (postsState: PostsState) => postsState,
    selectPostById: (postsState: PostsState, postId: string) => postsState.find((e) => e.id === postId),
  },
})

export const { postAdded, postUpdated } = postsSlice.actions
export const { selectAllPosts, selectPostById } = postsSlice.selectors

export default postsSlice.reducer
