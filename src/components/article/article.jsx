/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import Markdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popconfirm } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import classes from './article.module.scss'
import { addToFavorite, removeArticle, removeFromFavorite } from '../../store/article-reducer'

export default function Article({ article, mode }) {
  const { isAuth, user } = useSelector((state) => state.userReducer)
  const { isLoading: isLoadingArticle } = useSelector((state) => state.articleReducer)
  const { username: authUser, token } = user

  const {
    author = {},
    body = '',
    favorited,
    favoritesCount = 0,
    createdAt = '',
    description = '',
    title = '',
    tagList = [],
    slug,
  } = article
  const { username = '', image = 'https://t-bike.ru/images/products/no-image.jpg' } = author

  const shortText = (text, value) => {
    if (text.length > value) {
      let newText = text.slice(0, value)
      newText += '...'
      return newText
    }
    return text
  }

  function formatDate(date) {
    if (!date) return 'Дата выхода неизвестна'
    return format(new Date(date), 'PP')
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const confirm = () => {
    dispatch(removeArticle([token, slug]))
    navigate('/')
  }

  const handleChangeArticle = () => {
    navigate(`/articles/${slug}/edit`)
  }

  const [like, setLike] = useState(favorited)
  const [likeCounter, setLikeCounter] = useState(favoritesCount)
  useEffect(() => {
    setLike(favorited)
    setLikeCounter(favoritesCount)
  }, [favorited, favoritesCount])
  const handleFavorite = (event) => {
    event.preventDefault()
    if (isAuth) {
      if (like === true) {
        setLikeCounter(likeCounter - 1)
        setLike(false)
        dispatch(removeFromFavorite([token, slug]))
      } else {
        setLikeCounter(likeCounter + 1)
        setLike(true)
        dispatch(addToFavorite([token, slug]))
      }
    }
  }

  return (
    <div>
      {isLoadingArticle ? (
        <div>Загрузка статьи...</div>
      ) : (
        <div className={classes.article}>
          <div className={classes.article__header}>
            <div className={classes.article__header_left}>
              <div className={classes.article__info}>
                <div className={classes.article__title}>{shortText(title, 40)}</div>
                <span className={classes.article__rating}>
                  <HeartOutlined
                    onClick={(e) => handleFavorite(e)}
                    className={like ? classes['red-heart'] : classes['white-heart']}
                  />{' '}
                  {likeCounter}
                </span>
              </div>
              <div className={classes['tag-list']}>
                {tagList.map((tag) => (
                  <span className={classes.article__tag} key={slug + tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={classes.article__description}>{shortText(description, 300)}</div>
            </div>
            <div className={classes.article__header_right}>
              <div className={classes.article__author}>
                <div>
                  <div className={classes.article__header_author}>{username}</div>
                  <div className={classes.article__header_date}>{formatDate(createdAt)}</div>
                </div>
                <div>
                  <img src={image} alt="author" className={classes['author-avatar']} />
                </div>
              </div>

              {mode === 'page' && isAuth && username === authUser ? (
                <div className={classes['article-buttons']}>
                  <button
                    className={`${classes.article__button} ${classes['green-button']}`}
                    type="button"
                    onClick={handleChangeArticle}
                  >
                    Change
                  </button>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={confirm}
                    onCancel={() => console.log('no')}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className={classes.article__button} danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          {mode === 'list' ? (
            ''
          ) : (
            <div className={classes.article__body}>
              <Markdown>{body}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
