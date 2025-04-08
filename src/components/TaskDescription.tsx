import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { motion } from "framer-motion"

function TaskDescription() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tareaInfo, setTareaInfo] = useState<any>(null)
    const navigate = useNavigate()

    const fetchTask = async () => {
        try {
            setIsLoading(true)
            
            const taskId = id ? Number(id) : null
            
            if (!taskId || isNaN(taskId)) {
                const error = new Error ("ID de tarea inválido")
                throw error
            }

            const respuesta = await fetch(`http://localhost:3000/tareas/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!respuesta.ok) {
                const error = new Error('Error al obtener la tarea')
                setIsLoading(false)
                throw error
            }
            const data = await respuesta.json()
            setTareaInfo(data)
            console.log(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTask()
    }, [id])

    if (isLoading || tareaInfo === null) {
        return (
            <div className="task-descriptions-placeholder gap-2 w-full h-full flex flex-col py-4 items-center relative">
                <motion.div
                    className="w-3/4 h-[80vh] bg-gray-100 rounded-lg flex flex-col items-center justify-center"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <div className="h-8 w-1/3 bg-gray-200 rounded mb-8"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </motion.div>
            </div>
        )
    }

    return (
        <>
            <div className="task-descriptions-container gap-2 w-full h-full flex flex-col py-4 items-center relative">
                <motion.div className="edit-task flex justify-center gap-2 items-center w-max h-max px-4 py-2 absolute bg-blue-100 text-blue-500 position left-4 top-4 cursor-pointer active:bg-blue-200 transition-colors duration-200 rounded-xl" onClick={() => {
                    navigate(`/tareas/${id}/editar`)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                    <span className="font-semibold">Editar Tarea</span>
                </motion.div>
                <div className="task-des-title">
                    <h2 className="text-3xl font-semibold text-center leading-normal">{tareaInfo.name}</h2>
                </div>
                <div className="task-des-des text-center leading-normal">
                    <p>{tareaInfo?.description}</p>
                </div>
                <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhzN2E4Z3RscG9iZ2o1c3hmdzBzaHY1ZHY4aTZ2azFvaXFqdDhwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif" alt="" />
            </div>
        </>
    )
}

export default TaskDescription