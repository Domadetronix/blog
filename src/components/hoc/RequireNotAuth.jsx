/* eslint-disable import/no-extraneous-dependencies */
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireNotAuth({ children }) {
  const { isAuth } = useSelector((state) => state.userReducer)
  if (isAuth !== false) {
    return <Navigate to="/" />
  }
  return children
}

export default RequireNotAuth
