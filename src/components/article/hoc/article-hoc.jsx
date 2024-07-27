import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticle } from '../../../store/article-reducer'
import Article from '../article'

function ArticleHoc(id = '') {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticle(id))
  }, [dispatch, id])
  const { article } = useSelector((state) => state.articleReducer)
  console.log(article)
  return <Article article={article} mode="page" />
}

export default ArticleHoc
