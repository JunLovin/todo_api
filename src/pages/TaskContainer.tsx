import React, { useState, useEffect } from 'react'
import Tasks from '@components/Tasks'
import TaskDescription from '@components/TaskDescription'
import { Link } from 'react-router'
import { motion } from 'framer-motion'

function TaskContainer() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [task, setTask] = useState<boolean>(false)
    const [tareas, setTareas] = useState<any>(null)

    const fetchTasks = async () => {
        try {
            setIsLoading(true)
            const respuesta = await fetch('http://localhost:3000/tareas', {
                method: 'GET',
            })
            if (!respuesta.ok) {
                const error = new Error("Ha ocurrido un error")
                setIsLoading(false)
                throw error
            }
            const respuestaJson = await respuesta.json()
            setTareas(respuestaJson)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const activeTask = () => {
        setTask(true)
    }

    if (isLoading) {
        return (
            <div className="flex task-container">
                <div className="left-task w-[400px] min-h-[93dvh] border-r-2 border-[#E5E7EB] dark:border-[#374151] flex flex-col">
                    <div className="flex relative justify-center items-center w-full h-14 left-task-header">
                        <div className="absolute bottom-3 left-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>
                        </div>
                        <h2 className="text-2xl font-semibold">Mis Tareas</h2>
                        <div className="absolute bottom-3 right-4 cursor-pointer left-task-plus">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        </div>
                    </div>
                    <div className="tasks-container">
                        {/* Skeleton UI for tasks */}
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <motion.div
                                key={index}
                                className="p-4 border-b border-[#E5E7EB] dark:border-[#374151]"
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: [0.6, 0.8, 0.6] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            >
                                <div className="h-5 w-3/4 bg-[#E5E7EB] dark:bg-[#374151] rounded mb-2"></div>
                                <div className="h-4 w-5/6 bg-[#E5E7EB] dark:bg-[#374151] rounded"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex task-container">
                <div className="left-task w-[400px] min-h-[93dvh] border-r-2 border-neutral-300 flex flex-col">
                    <div className="flex relative justify-center items-center w-full h-14 left-task-header">
                        <div className="absolute bottom-3 left-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>
                        </div>
                        <h2 className="text-2xl font-semibold">Mis Tareas</h2>
                        <Link to="/tareas/crear">
                            <div className="absolute bottom-3 right-4 cursor-pointer left-task-plus">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            </div>
                        </Link>
                    </div>
                    <div className="tasks-container" onClick={activeTask}>
                        {tareas?.map((element, i) => {
                            return (
                                <Link to={`/tareas/${element.id}`} key={i}>
                                    <Tasks title={element.name} id={element.id} description={element.description} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="right-task w-[70%] mx-auto flex justify-center items-center">
                    {task &&
                        <TaskDescription />
                    }
                </div>
            </div>
        </>
    )
}

export default TaskContainer