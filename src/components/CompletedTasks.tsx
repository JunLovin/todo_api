import React, { useState, useEffect } from 'react'
import Tasks from '@components/Tasks'
import { Link } from 'react-router'
import CompletedTaskDescription from './CompletedTaskDescription'
import { motion } from 'framer-motion'

function CompletedTasks() {
    const [task, setTask] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tareasCompletadas, setTareasCompletadas] = useState<any>(null)

    const obtenerTareasCompletadas = async () => {
        try {
            setIsLoading(true)
            const respuesta = await fetch(`http://localhost:3000/tareascompletadas`, { method: 'GET' })
            if (!respuesta.ok) {
                setIsLoading(false)
                const error = new Error("Ha ocurrido un error")
                throw error
            }
            const respuestaJson = await respuesta.json()
            setTareasCompletadas(respuestaJson)
            console.log(respuestaJson)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        obtenerTareasCompletadas()
    }, [])

    const activeTask = () => { 
        setTask(true)
    }

    if (isLoading) {
        return (
            <div className="flex task-container">
                <div className="left-task w-[400px] min-h-[93dvh] border-r-2 border-[#E5E7EB] dark:border-[#374151] flex flex-col">
                    <div className="flex relative justify-center items-center w-full h-14 left-task-header">
                        <h2 className="text-2xl font-semibold">Tareas Completadas</h2>
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
                <div className="left-task w-[400px] min-h-[93dvh] border-r-2  border-neutral-300  transition-colors duration-200 dark:border-[#1F2937] flex flex-col">
                    <div className="flex relative justify-center items-center w-full h-14 left-task-header">
                        <h2 className="text-2xl font-semibold">Tareas Completadas</h2>
                    </div>
                    {
                    <div className="tasks-container" onClick={activeTask}>
                        {tareasCompletadas?.map((element, i) => {
                            return (
                                <Link to={`/tareascompletadas/${element.id}`} key={i}>
                                    <Tasks title={element.name} id={element.id} description={element.description} completed={true}/>
                                </Link>
                            )
                        })}
                    </div>
                    }
                </div>
                <div className="right-task w-[70%] mx-auto flex justify-center items-center">
                    {task && (
                        <CompletedTaskDescription />
                    )}
                </div>
            </div>
        </>
    )
}

export default CompletedTasks