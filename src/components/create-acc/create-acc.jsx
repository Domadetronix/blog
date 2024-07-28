/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cl from './create-acc.module.scss'
import { registrationUser } from '../../store/user-reducer'

export default function SignUp() {
  const { error: errorUser } = useSelector((state) => state.userReducer)

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm()
  const dispatch = useDispatch()
  const [errorM, setErrorM] = useState(false)
  useEffect(() => setErrorM(errorUser), [errorUser])
  useEffect(() => setErrorM(false), [])
  const onSubmit = (data) => {
    dispatch(registrationUser({ username: data.name, email: data.mail, password: data.password }))
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
  const passwordDetect = (password) => password === watch('password')
  return (
    <div className={cl.container}>
      {errorM ? <div className={cl['error-message']}>Пользователь с такими данными уже существует</div> : ''}
      <div className={cl.header}>Create new account</div>
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
        <div className={cl.form__item}>
          <div className={cl.form__item_label}>Repeat Password</div>
          <input
            className={cl.form__item_input}
            type="text"
            placeholder="Repeat Password"
            {...register('passwordConfirm', { required: true, validate: passwordDetect })}
            aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
          />
          {errors.passwordConfirm && (
            <p className={cl['input-error']} role="alert">
              Passwords don&apos;t match
            </p>
          )}
        </div>
        <hr />
        <div className={cl.form__item_checkbox}>
          <label htmlFor="confirm">
            <input
              className={(cl.form__item_input_checkbox, cl['custom-checkbox'])}
              type="checkbox"
              id="confirm"
              {...register('agree', { required: true, maxLength: 20 })}
              aria-invalid={errors.agree ? 'true' : 'false'}
            />
            <span className={cl.form__item_label_checkbox}>I agree to the processing of my personal information</span>
          </label>
        </div>{' '}
        {errors.agree && (
          <p className={cl['input-error']} role="alert">
            agree is required
          </p>
        )}
        <button type="submit" className={cl.form__button}>
          Create
        </button>
      </form>
      <div className={cl.footer}>
        Already have an account?{' '}
        <Link to="/sign-in">
          <span className={cl.blue}>Sign In</span>.
        </Link>
      </div>
    </div>
  )
}
