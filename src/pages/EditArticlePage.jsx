/* eslint-disable import/no-extraneous-dependencies */
import { useParams } from 'react-router-dom'
import EditArticle from '../components/editArticle/editArticle'

function EditArticlePage() {
  const { id } = useParams()
  return <EditArticle id={id} />
}

export default EditArticlePage
