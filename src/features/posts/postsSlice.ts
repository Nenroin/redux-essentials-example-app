import { nanoid } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { userLoggedOut } from '@/features/auth/authSlice'

export type Reactions = {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export type ReactionName = keyof Reactions

export type Post = {
  id: string
  date: string
  title: string
  content: string
  reactions: Reactions
  userId: string
}

type PostUpdate = Omit<Post, 'userId' | 'date' | 'reactions'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

export type PostsState = Post[]

const initialState: PostsState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialReactions,
    userId: '1',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialReactions,
    userId: '2',
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
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
            reactions: initialReactions,
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
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut, (state) => {
      return initialState
    })
  },
  selectors: {
    selectAllPosts: (postsState: PostsState) => postsState,
    selectPostById: (postsState: PostsState, postId: string) => postsState.find((e) => e.id === postId),
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export const { selectAllPosts, selectPostById } = postsSlice.selectors

export default postsSlice.reducer
