import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ArticleForm from './articleForm'
import { fetchArticle } from '../../store/article-reducer'

export default function EditArticle({ id }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticle([id]))
  }, [])

  const { article } = useSelector((state) => state.articleReducer)
  return <ArticleForm article={article} isEditing="true" />
}
