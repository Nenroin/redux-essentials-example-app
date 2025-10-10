import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  userId: string | undefined
}

const initialState: AuthState = {
  userId: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<string>) {
      state.userId = action.payload
    },
    userLoggedOut(state) {
      state.userId = undefined
    },
  },
  selectors: {
    selectCurrentUserId: (state) => state.userId,
  },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export const { selectCurrentUserId } = authSlice.selectors

export default authSlice.reducer
