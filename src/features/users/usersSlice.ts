import { createSlice } from '@reduxjs/toolkit'
import { selectCurrentUserId } from '@/features/auth/authSlice'
import { RootState } from '@/app/store'

export const selectCurrentUser = (state: RootState) => {
  const currentUserId = selectCurrentUserId(state)
  return currentUserId ? selectUserById(state, currentUserId) : undefined
}

export type User = {
  id: string
  name: string
}

export type UsersState = User[]

const initialState: UsersState = [
  { id: '1', name: 'Tianna Jenkins' },
  { id: '2', name: 'Kevin Grant' },
  { id: '3', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  selectors: {
    selectAllUsers: (usersState: UsersState) => usersState,
    selectUserById: (usersState: UsersState, userId: string) => usersState.find((e) => e.id === userId),
  },
})

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export default usersSlice.reducer
