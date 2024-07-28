/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createNewUser, updateUserData, userLogIn } from '../services/blog-service'

export const registrationUser = createAsyncThunk('user/registrationUser', async (user) => {
  const responce = await createNewUser(user)
  if (responce.ok) localStorage.setItem({ user: user.json() })
  return responce
})

export const authorizeUser = createAsyncThunk('user/authorizeUser', async (user) => {
  const responce = await userLogIn(user)
  if (responce.ok) localStorage.setItem({ user: user.json() })
  return responce
})

export const updateUser = createAsyncThunk('user/updateUser', async (newData) => {
  const [token, data] = newData
  const responce = await updateUserData(token, data)
  localStorage.setItem('user', JSON.stringify(responce.user))
  return responce.user
})

const initialState = {
  isAuth: false,
  user: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: null,
  },
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isAuth = true
    },
    logOutUser(state) {
      // eslint-disable-next-line no-unused-vars
      state.isAuth = false
      state.user = {
        email: '',
        token: '',
        username: '',
        bio: '',
        image: null,
      }
      localStorage.removeItem('user')
    },
    clearUserLoadErr(state) {
      state.isLoading = false
      state.error = false
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(registrationUser.pending, (state) => {
      state.isLoading = true
    })
    addCase(registrationUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user.username = action.payload.username
      state.user.email = action.payload.email
      state.user.token = action.payload.token
      state.isAuth = true
      state.error = null
    })
    // eslint-disable-next-line no-unused-vars
    addCase(registrationUser.rejected, (state) => {
      state.isLoading = false
      state.error = 'Ошибка!!!'
    })
    addCase(authorizeUser.pending, (state) => {
      state.isLoading = true
    })
    addCase(authorizeUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user.username = action.payload.username
      state.user.email = action.payload.email
      state.user.token = action.payload.token
      state.user.image = action.payload.image
      state.isAuth = true
      state.error = null
    })
    // eslint-disable-next-line no-unused-vars
    addCase(authorizeUser.rejected, (state) => {
      state.isLoading = false
      state.error = 'email or password is invalid'
    })
    addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user.username = action.payload.username
      state.user.email = action.payload.email
      state.user.token = action.payload.token
      state.user.image = action.payload.image
      state.error = null
    })
    // eslint-disable-next-line no-unused-vars
    addCase(updateUser.rejected, (state) => {
      state.isLoading = false
      state.error = 'Ошибка!!!'
    })
  },
})

export const { setUser, clearUserLoadErr, logOutUser } = userSlice.actions

export default userSlice.reducer
