/* eslint-disable import/no-extraneous-dependencies */
import { useParams } from 'react-router-dom'
import ArticleHoc from '../components/article/hoc/article-hoc'

function Articlepage() {
  const { id } = useParams()
  return ArticleHoc(id)
}

export { Articlepage }
