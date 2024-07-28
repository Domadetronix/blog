/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import cl from '../create-acc/create-acc.module.scss'
import { authorizeUser } from '../../store/user-reducer'

export default function SignUp() {
  const { error: errorUser } = useSelector((state) => state.userReducer)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const [errorM, setErrorM] = useState(false)
  useEffect(() => setErrorM(errorUser), [errorUser])
  useEffect(() => setErrorM(false), [])
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(authorizeUser({ email: data.mail, password: data.password }))
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

  return (
    <div className={cl.container}>
      {errorM ? <div className={cl['error-message']}>Неправильный логин или пароль</div> : ''}
      <div className={cl.header}>Login to your account</div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className={cl.form__item_label}>Password</div>
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
        <button type="submit" className={cl.form__button}>
          Login
        </button>
      </form>
      <div className={cl.footer}>
        Don’t have an account?
        <Link to="/sign-up">
          <span className={cl.blue}>Sign Up</span>.
        </Link>
      </div>
    </div>
  )
}
