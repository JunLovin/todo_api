import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

function TaskDescription() {
    const { id } = useParams()
    const [tareaInfo, setTareaInfo] = useState<any>(null) 

    const fetchTask = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/tareas/${parseInt(id)}`, { method: 'GET' })
            if (!respuesta.ok) {
                const error = new Error('Error al obtener la tarea')
                throw error
            }
            const data = await respuesta.json()
            setTareaInfo(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchTask()
    }, [id])

    if (tareaInfo === null) {
        return <div>Cargando...</div>
    }

    return (
        <>
        <div className="task-descriptions-container gap-2 w-full h-full flex flex-col py-4 items-center relative">
            <div className="task-des-title">
                <h2 className="text-3xl font-semibold text-center leading-normal">{tareaInfo.title}</h2>
            </div>
            <div className="task-des-des text-center leading-normal">
                <p>{tareaInfo.description}</p>
            </div>
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhzN2E4Z3RscG9iZ2o1c3hmdzBzaHY1ZHY4aTZ2azFvaXFqdDhwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif" alt=""/>
        </div>
        </>
    )
}

export default TaskDescription