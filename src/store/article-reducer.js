/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArticle,
  createNewArticle,
  updateExistingArticle,
  deleteArticle,
  setFavorite,
  removeFavorite,
} from '../services/blog-service'

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (data) => {
  const [id, token = ''] = data
  console.log(id)
  const responce = await getArticle(id, token)
  return responce
})

export const createArticle = createAsyncThunk('article/createArticle', async (data) => {
  const [token, article] = data
  const responce = await createNewArticle(token, article)

  return responce
})

export const updateArticle = createAsyncThunk('article/updateArticle', async (data) => {
  const [token, article, slug] = data

  const responce = await updateExistingArticle(token, article, slug)

  return responce
})

export const removeArticle = createAsyncThunk('article/removeArticle', async (data) => {
  const [token, slug] = data
  const responce = await deleteArticle(token, slug)

  return responce
})

export const addToFavorite = createAsyncThunk('article/addToFavorite', async (data) => {
  const [token, slug] = data

  const responce = await setFavorite(token, slug)

  return responce
})
export const removeFromFavorite = createAsyncThunk('article/removeFromFavorite', async (data) => {
  const [token, slug] = data
  const responce = await removeFavorite(token, slug)

  return responce
})

const initialState = {
  article: {},
  currentArticleId: '',
  isLoading: false,
  error: null,
  changed: false,
}

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentId(state, action) {
      state.currentArticleId = action.payload
    },
    clearCurrentArticle(state) {
      state.article = {}
      state.currentArticleId = ''
    },
    clearLoadErr(state) {
      state.isLoading = false
      state.error = false
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
      state.isLoading = false
      state.error = 'Ошибка!!!'
    })
    addCase(createArticle.pending, (state) => {
      state.isLoading = true
    })
    addCase(createArticle.fulfilled, (state, action) => {
      state.isLoading = false
      state.article = action.payload.article
      state.currentArticleId = action.payload.article.slug
      state.error = null
      state.changed = !state.changed
    })
    // eslint-disable-next-line no-unused-vars
    addCase(createArticle.rejected, (state) => {
      state.isLoading = false
      state.error = 'Ошибка!!!'
    })

    addCase(updateArticle.pending, (state) => {
      state.isLoading = true
    })
    addCase(updateArticle.fulfilled, (state, action) => {
      state.isLoading = false
      state.article = action.payload.article
      state.currentArticleId = action.payload.article.slug
      state.error = null
      state.changed = !state.changed
    })
    // eslint-disable-next-line no-unused-vars
    addCase(updateArticle.rejected, (state) => {
      state.isLoading = false
      state.error = 'Ошибка!!!'
    })

    addCase(removeArticle.pending, (state) => {
      state.isLoading = true
      state.article = {}
      state.currentArticleId = ''
    })
    addCase(removeArticle.fulfilled, (state) => {
      state.isLoading = false
      state.error = null
      state.changed = !state.changed
    })
    // eslint-disable-next-line no-unused-vars
    addCase(removeArticle.rejected, (state) => {
      state.isLoading = false
      state.error = 'Ошибка!!!'
    })

    addCase(addToFavorite.fulfilled, (state) => {
      state.error = null
      // state.article.favorited = action.payload.favorited
      // state.article.favoritesCount = action.payload.favoritesCount
    })
    addCase(addToFavorite.rejected, (state) => {
      state.error = 'Ошибка!!!'
    })
    addCase(removeFromFavorite.fulfilled, (state) => {
      state.error = null
      // state.article.favorited = action.payload.favorited
      // state.article.favoritesCount = action.payload.favoritesCount
    })
    addCase(removeFromFavorite.rejected, (state) => {
      state.error = 'Ошибка!!!'
    })
  },
})

export const { setCurrentId, clearLoadErr } = articleSlice.actions

export default articleSlice.reducer
