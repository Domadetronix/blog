/* eslint-disable import/no-extraneous-dependencies */
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const { isAuth } = useSelector((state) => state.userReducer)
  if (isAuth === false) {
    return <Navigate to="/sign-up" />
  }
  return children
}

export default RequireAuth
