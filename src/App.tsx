import React from 'react'
import Header from '@components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Principal from '@components/Principal'

function App() {
  const location = useLocation()
  const home = location.pathname === '/'

  return (
    <>
    <Header />
    {home && (
      <>
      <Principal />
      </>
    )}
    <Outlet />
    </>
  )
}

export default App