// eslint-disable-next-line import/no-extraneous-dependencies
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './header.module.scss'
import { logOutUser } from '../../store/user-reducer'

export default function Header() {
  const setActive = (isActive) => (isActive ? classes['active-link'] : '')

  const { isAuth, user } = useSelector((state) => state.userReducer)
  const { username, image } = user
  useEffect(() => {}, [username, image])

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOutUser())
  }

  return (
    <header>
      <NavLink
        to="/articles"
        className={(isActive) => `${setActive({ isActive })} ${classes.header__logo ? classes.header__logo : ''}`}
      >
        Realworld Blog
      </NavLink>
      <div className={classes.header__account}>
        {isAuth ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${setActive(isActive)} ${classes.header__account_in ? classes.header__account_in : ''}`
              }
            >
              Create article
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${setActive(isActive)} ${classes.header__account_in ? classes.header__account : ''}`
              }
            >
              <span>{username}</span>
              <img alt="avatar" src={image} className={classes['user-image']} />
            </NavLink>
            <NavLink
              onClick={handleLogOut}
              to="/"
              className={({ isActive }) =>
                `${setActive(isActive)} ${classes.header__account_in ? classes.header__account_in : ''}`
              }
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `${setActive(isActive)} ${classes.header__account_in ? classes.header__account_in : ''}`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                `${setActive(isActive)} ${classes.header__account_in ? classes.header__account_in : ''}`
              }
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}
