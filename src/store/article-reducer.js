/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticle } from '../services/blog-service'

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (id) => {
  const responce = await getArticle(id)
  return responce
})

const initialState = {
  article: {},
  currentArticleId: '',
  isLoading: true,
  error: null,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentId(state, action) {
      state.currentArticleId = action.payload
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchArticle.pending, (state) => {
      state.isLoading = true
    })
    addCase(fetchArticle.fulfilled, (state, action) => {
      state.isLoading = false
      state.article = action.payload.article
      state.error = null
    })
    // eslint-disable-next-line no-unused-vars
    addCase(fetchArticle.rejected, (state) => {
      state.error = 'Ошибка!!!'
    })
  },
})

export const { setCurrentId } = articleSlice.actions

export default articleSlice.reducer
