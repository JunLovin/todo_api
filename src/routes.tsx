import React from 'react'
import App from './App'

type Route = [
    {
    path: string
    element: React.ReactNode
    }
]

const routes: Route = [
    {
        path: '/',
        element: <App />,
    }
]

export default routes