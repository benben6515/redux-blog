import { createSlice } from '@reduxjs/toolkit'
import { registerAPI, loginAPI, getMeAPI } from '../../webAPI'

const initialState = {
  user: null,
  isUserLoading: false,
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setIsUserLoading: (state, action) => {
      state.isUserLoading = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser, setIsUserLoading } = userSlice.actions

export const getMe = token => async dispatch => {
  dispatch(setIsUserLoading(true))
  try {
    const res = await getMeAPI(token)
    dispatch(setUser(res.data))
    dispatch(setIsUserLoading(false))
    return res
  } catch (err) {
    console.log(err)
  }
}

export const login = (username, password) => async dispatch => {
  dispatch(setIsUserLoading(true))
  try {
    const res = await loginAPI(username, password)
    dispatch(setUser(res.data))
    dispatch(setIsUserLoading(false))
    return res
  } catch (err) {
    console.log(err)
  }
}

export const register = (nickname, username, password) => async dispatch => {
  dispatch(setIsUserLoading(true))
  try {
    const res = await registerAPI(nickname, username, password)
    dispatch(setUser(res.data))
    dispatch(setIsUserLoading(false))
    return res
  } catch (err) {
    console.log(err)
  }
}

export const selectUser = (state) => state.user.user
export const selectIsUserLoading = (state) => state.user.isUserLoading

export default userSlice.reducer
