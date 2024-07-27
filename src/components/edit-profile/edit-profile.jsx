/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import cl from '../create-acc/create-acc.module.scss'
import { updateUser } from '../../store/user-reducer'

export default function EditProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const { token } = useSelector((state) => state.userReducer.user)

  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(updateUser([token, { username: data.name, email: data.mail, password: data.password, image: data.image }]))
  }
  const validateEmail = (email) => {
    const flag = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    if (flag !== null) return true
    return false
  }

  const isValidUrl = (urlString) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // проверка протокола
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // проверка имени домена
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // проверка ip адреса (версия 4, не 6)
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // проверка порта и пути
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // проверка параметров запроса
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // проверка хэша

    return !!urlPattern.test(urlString)
  }

  return (
    <div className={cl.container}>
      <div className={cl.header}>Change account info</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cl.form__item}>
          <div className={cl.form__item_label}>Username</div>
          <input
            className={cl.form__item_input}
            type="text"
            placeholder="Username"
            {...register('name', { required: true, maxLength: 20, minLength: 3 })}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className={cl['input-error']} role="alert">
              First name is required
            </p>
          )}
        </div>
        <div className={cl.form__item}>
          <div className={cl.form__item_label}>Email address</div>
          <input
            className={cl.form__item_input}
            type="text"
            placeholder="Email address"
            {...register('mail', { required: true, validate: { validateEmail } })}
            aria-invalid={errors.mail ? 'true' : 'false'}
          />
          {errors.mail && (
            <p className={cl['input-error']} role="alert">
              Mail is required. Invalid format.
            </p>
          )}
        </div>
        <div className={cl.form__item}>
          <div className={cl.form__item_label}>New password</div>
          <input
            className={cl.form__item_input}
            type="text"
            placeholder="Password"
            {...register('password', { required: true, minLength: 6, maxLength: 40 })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <p className={cl['input-error']} role="alert">
              Password is required. It must be from 6 to 40 characters.
            </p>
          )}
        </div>
        <div className={cl.form__item}>
          <div className={cl.form__item_label}>Avatar image (url)</div>
          <input
            className={cl.form__item_input}
            type="text"
            placeholder="Avatar image"
            {...register('image', { validate: isValidUrl })}
            aria-invalid={errors.image ? 'true' : 'false'}
          />
          {errors.password && (
            <p className={cl['input-error']} role="alert">
              Invalid image
            </p>
          )}
        </div>
        <button type="submit" className={cl.form__button}>
          Confirm changes
        </button>
      </form>
    </div>
  )
}
