/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticles } from '../services/blog-service'

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (page) => {
  const responce = await getArticles(page)
  return responce
})

const initialState = {
  articlesCount: 0,
  articleList: [],
  currentPage: 1,
  isLoading: true,
  error: null,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changePage(state, action) {
      state.currentPage = action.payload
    },
    setArticles(state, action) {
      state.articleList = action.payload
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchArticles.pending, (state) => {
      state.isLoading = true
    })
    addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false
      state.articleList = action.payload.articles
      state.articlesCount = action.payload.articlesCount
      state.error = null
    })
    // eslint-disable-next-line no-unused-vars
    addCase(fetchArticles.rejected, (state) => {
      state.error = 'Ошибка!!!'
    })
  },
})

export const { setArticles, changePage } = articlesSlice.actions

export default articlesSlice.reducer
