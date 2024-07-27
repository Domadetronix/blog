import ArticleList from '../components/article-list/article-list'

function Homepage({ articleList }) {
  return <ArticleList articleList={articleList} />
  // тут будет пагинация
}

export { Homepage }
