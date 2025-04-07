import React from 'react'
import Header from '@components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import AskName from '@components/AskName'

function App() {
  const location = useLocation()
  const home = location.pathname === '/'

  return (
    <>
    <Header />
    {home && (
      <>
      <AskName />
      </>
    )}
    <Outlet />
    </>
  )
}

export default App