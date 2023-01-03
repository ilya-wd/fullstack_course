import userService from '../services/user'
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setU(state, action) {
      return action.payload
    },
    removeU() {
      return null
    },
  },
})

export const { setU, removeU } = userSlice.actions

export const setUser = () => {
  return async (dispatch) => {
    const user = userService.getUser()
    dispatch(setU(user))
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    userService.setUser(user)
    dispatch(setU(user))
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(removeU())
  }
}

export default userSlice.reducer
