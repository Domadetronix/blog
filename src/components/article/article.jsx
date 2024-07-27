/* eslint-disable import/no-extraneous-dependencies */
import Markdown from 'react-markdown'
import { format } from 'date-fns'
import classes from './article.module.scss'

export default function Article({ article, mode }) {
  const {
    author = {},
    body = '',
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

  return (
    <div className={classes.article}>
      <div className={classes.article__header}>
        <div className={classes.article__header_left}>
          <div className={classes.article__info}>
            <div className={classes.article__title}>{shortText(title, 40)}</div>
            <span className={classes.article__rating}>🤍 {favoritesCount}</span>
          </div>
          <div className={classes['tag-list']}>
            {tagList.map((tag) => (
              <span className={classes.article__tag} key={slug + tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.article__header_right}>
          <div>
            <div className={classes.article__header_author}>{username}</div>
            <div className={classes.article__header_date}>{formatDate(createdAt)}</div>
          </div>
          <div>
            <img src={image} alt="author" className={classes['author-avatar']} />
          </div>
        </div>
      </div>
      <div className={classes.article__description}>{shortText(description, 300)}</div>
      {mode === 'list' ? (
        ''
      ) : (
        <div className={classes.article__body}>
          <Markdown>{body}</Markdown>
        </div>
      )}
    </div>
  )
}
