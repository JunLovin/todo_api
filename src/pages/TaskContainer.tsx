import React, { useState, useEffect } from 'react'
import Tasks from '@components/Tasks'
import TaskDescription from '@components/TaskDescription'
import { Link } from 'react-router'

function TaskContainer() {
    const [task, setTask] = useState<boolean>(false)
    const [tareas, setTareas] = useState<any>(null)

    const fetchTasks = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/tareas', { 
                method: 'GET',
            })
            const respuestaJson = await respuesta.json()
            if (respuestaJson) {
                setTareas(respuestaJson)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])
    
    const activeTask = () => {
        setTask(true)
    }

    if (tareas !== null) {
        console.log(tareas)
    }

    return (
        <>
        <div className="task-container flex">
            <div className="left-task w-[400px] min-h-[93dvh] border-r-2 border-neutral-300 flex flex-col">
                <div className="left-task-header w-full h-14 flex justify-center items-center relative">
                    <h2 className="text-2xl font-semibold">Mis Tareas</h2>
                    <Link to="/tareas/crear">
                    <div className="left-task-plus absolute right-4 bottom-3 cursor-pointer">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    </div>
                    </Link>
                </div>
                <div className="tasks-container" onClick={activeTask}>
                    {tareas?.map((element, i) => {
                        return (
                            <Link to={`/tareas/${element.id}`}>
                                <Tasks key={i} title={element.title} id={element.id} description={element.description}/>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="right-task w-[70%]">
                {task &&
                    <TaskDescription />
                }
            </div>
        </div>
        </>
    )
}

export default TaskContainer