import React from 'react'
import App from './App'
import TaskContainer from '@pages/TaskContainer'
import CreateTask from '@pages/CreateTask'
import Contact from '@pages/Contact'
import EditTask from '@pages/EditTask'
import CompletedTasks from './components/CompletedTasks'

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
            },
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
                path: '/tareascompletadas',
                element: <CompletedTasks />
            },
            {
                path: '/tareascompletadas/:id',
                element: <CompletedTasks />
            },
            {
                path: '/tareas/crear',
                element: <CreateTask />
            },
            {
                path: '/tareas/:id/editar',
                element: <EditTask />
            },
            {
                path: '/contacto',
                element: <Contact />
            },
        ]
    }
]

export default routes