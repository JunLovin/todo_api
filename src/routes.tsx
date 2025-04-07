import React from 'react'
import App from './App'
import TaskContainer from '@pages/TaskContainer'
import CreateTask from '@pages/CreateTask'

type Route = [
    {
        path: string,
        element: React.ReactNode,
        children: [
            {
                path: string,
                element: React.ReactNode,
            },
            {
                path: string,
                element: React.ReactNode,
            },
            {
                path: string,
                element: React.ReactNode,
            }
        ]
    }
]

const routes: Route = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/tareas',
                element: <TaskContainer />,
            },
            {
                path: '/tareas/:id',
                element: <TaskContainer />
            },
            {
                path: '/tareas/crear',
                element: <CreateTask />
            }
        ]
    }
]

export default routes