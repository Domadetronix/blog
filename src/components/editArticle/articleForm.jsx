/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cl from './article-form.module.scss'
import { createArticle, updateArticle } from '../../store/article-reducer'

export default function ArticleForm({
  article = {
    title: 'Title',
    description: 'Short description',
    body: 'Main text',
    tagList: [],
    slug: '',
  },
  isEditing = false,
}) {
  const { title, description, body, tagList, slug } = article
  const [tagValue, setTagValue] = useState('')
  const [tagArray, setTagArray] = useState(tagList || [])
  const [tagError, setTagError] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const { token } = useSelector((state) => state.userReducer.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmitCreating = (data) => {
    dispatch(
      createArticle([token, { title: data.title, description: data.description, body: data.body, tagList: tagArray }])
    )
    navigate(`/articles/${slug}`)
  }

  const onSubmitUpdating = (data) => {
    dispatch(
      updateArticle([
        token,
        { title: data.title, description: data.description, body: data.body, tagList: tagArray },
        slug,
      ])
    )
    navigate(`/articles/${slug}`)
  }

  const handleAddTag = () => {
    if (!tagArray.includes(tagValue) && tagValue) {
      setTagArray([...tagArray, tagValue])
      setTagValue('')
    } else setTagError('Повтор или пустой тег')
  }

  const handleRemoveTag = (tag) => {
    setTagArray(tagArray.filter((item) => item !== tag))
  }

  const { isLoading, error } = useSelector((state) => state.articleReducer)

  return (
    <div className={cl.container}>
      {isLoading ? (
        <div> Данные загружаются... пожалуйста, подождите</div>
      ) : error ? (
        <div> Произошла ошибка, попробуйте снова или обратитесь ко мне</div>
      ) : (
        <>
          <div className={cl.header}>{isEditing ? 'Change your article' : 'Create new article'}</div>
          <form onSubmit={isEditing ? handleSubmit(onSubmitUpdating) : handleSubmit(onSubmitCreating)}>
            <div className={cl.form__item}>
              <div className={cl.form__item_label}>Title</div>
              <input
                className={cl.form__item_input}
                type="text"
                defaultValue={title}
                placeholder="Title"
                {...register('title', { required: true })}
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title && (
                <p className={cl['input-error']} role="alert">
                  Title is required
                </p>
              )}
            </div>
            <div className={cl.form__item}>
              <div className={cl.form__item_label}>Short description</div>
              <input
                className={cl.form__item_input}
                type="text"
                defaultValue={description}
                placeholder="Short description"
                {...register('description', { required: true })}
                aria-invalid={errors.description ? 'true' : 'false'}
              />
              {errors.description && (
                <p className={cl['input-error']} role="alert">
                  Description in required!
                </p>
              )}
            </div>
            <div className={cl.form__item}>
              <div className={cl.form__item_label}>Text</div>
              <textarea
                className={`${cl.form__item_input} ${cl['main-text-input']}`}
                type="text"
                defaultValue={body}
                placeholder="Text"
                {...register('body', { required: true })}
                aria-invalid={errors.body ? 'true' : 'false'}
              />
              {errors.body && (
                <p className={cl['input-error']} role="alert">
                  Main text in required!
                </p>
              )}
            </div>
            <div className={cl.form__item}>
              <div className={`${cl.form__item_label} ${cl.tag}`}>Tags</div>
              {tagArray.map((tag) => (
                <div className={cl.tag__item} key={tag}>
                  <div className={cl.tag__item_tag}>{tag}</div>
                  <button className={cl.tag__item_button} type="button" onClick={() => handleRemoveTag(tag)}>
                    Delete
                  </button>
                </div>
              ))}
              <fieldset className={cl.tag__item}>
                <input
                  className={`${cl.form__item_input} ${cl.tag__input}`}
                  type="text"
                  placeholder="Tag"
                  {...register('tags')}
                  aria-invalid={errors.tags ? 'true' : 'false'}
                  value={tagValue}
                  onInput={(event) => {
                    setTagError('')
                    setTagValue(event.target.value)
                  }}
                />
                <button
                  className={`${cl.tag__item_button} ${cl['blue-button']}`}
                  type="button"
                  onClick={() => handleAddTag()}
                >
                  Add tag
                </button>
              </fieldset>
              {tagError && (
                <p className={cl['input-error']} role="alert">
                  Теги не могут повторяться или быть пустыми
                </p>
              )}
            </div>
            <button
              type="submit"
              onClick={() => (isEditing ? handleSubmit(onSubmitUpdating) : handleSubmit(onSubmitCreating))}
              className={cl.form__button}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  )
}
