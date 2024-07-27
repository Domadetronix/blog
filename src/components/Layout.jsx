// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet } from 'react-router-dom'
import Header from './header/header'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
