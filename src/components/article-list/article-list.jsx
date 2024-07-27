/* eslint-disable import/no-extraneous-dependencies */

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'
import Article from '../article/article'
import cl from './article-list.module.scss'
import { changePage, fetchArticles } from '../../store/article-list-reducer'

export default function ArticleList() {
  const { articleList, currentPage, articlesCount } = useSelector((state) => state.articleListReducer)
  const dispatch = useDispatch()
  const handlePageNum = (page) => dispatch(changePage(page))
  useEffect(() => {
    dispatch(fetchArticles(currentPage))
  }, [dispatch, currentPage])
  return (
    <>
      <div className={cl.articles}>
        {articleList.length ? (
          articleList.map((article) => (
            <Link to={`/articles/${article.slug}`} key={article.slug}>
              <Article article={article} mode="list" />
            </Link>
          ))
        ) : (
          <div>Articles are loading...</div>
        )}
      </div>
      <Pagination
        current={currentPage}
        defaultCurrent={1}
        total={articlesCount}
        pageSize={5}
        pageSizeOptions={[]}
        showSizeChanger={false}
        onChange={(page) => {
          // eslint-disable-next-line no-undef
          handlePageNum(page)
        }}
      />
    </>
  )
}
