import { combineReducers } from 'redux'
import articleListReducer from './article-list-reducer'
import articleReducer from './article-reducer'
import userReducer from './user-reducer'

export const reducers = combineReducers({
  articleListReducer,
  articleReducer,
  userReducer,
})
