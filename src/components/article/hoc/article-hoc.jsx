import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticle } from '../../../store/article-reducer'
import Article from '../article'

function ArticleHoc(id = '') {
  const dispatch = useDispatch()
  const { user, isAuth } = useSelector((state) => state.userReducer)
  const { error: errorArticle } = useSelector((state) => state.articleReducer)
  const [error, setError] = useState(false)
  const { token = '' } = user
  useEffect(() => {
    dispatch(fetchArticle(token ? [id, token] : [id, '']))
  }, [dispatch, id, token, isAuth])

  const { article } = useSelector((state) => state.articleReducer)
  useEffect(() => setError(errorArticle), [errorArticle, article])
  useEffect(() => setError(false), [article])
  console.log(error, errorArticle)
  return error ? (
    <div className="error-message">Произошла ошибка, возможно такой статьи не существует</div>
  ) : (
    <Article article={article} mode="page" />
  )
}

export default ArticleHoc
