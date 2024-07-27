/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line no-unused-vars
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import cl from './app.module.scss'

import { Homepage } from '../../pages/Homepage'
import { SignUpPage } from '../../pages/SignUpPage'
import { SignInPage } from '../../pages/SignInPage'

import Layout from '../Layout'
import { Articlepage } from '../../pages/Articlepage'
import { setUser } from '../../store/user-reducer'
import Profilepage from '../../pages/Profilepage'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch(setUser(user))
    }
  }, [dispatch])

  return (
    <div className={cl.main}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/articles" element={<Homepage />} />
          <Route path="/articles/:id" element={<Articlepage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </div>
  )
}
