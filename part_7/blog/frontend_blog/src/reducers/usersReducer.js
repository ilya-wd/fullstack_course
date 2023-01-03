import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setU(state, action) {
      return action.payload
    },
  },
})

export const { setU } = usersSlice.actions

export const setUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch(setU(users))
  }
}

export default usersSlice.reducer
