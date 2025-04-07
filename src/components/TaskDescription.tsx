import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"

function TaskDescription() {
    const { id } = useParams()
    const [tareaInfo, setTareaInfo] = useState<any>(null) 
    const navigate = useNavigate()

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
            <div className="edit-task flex justify-center gap-2 items-center w-max h-max px-4 py-2 absolute bg-blue-100 text-blue-500 position left-4 top-4 cursor-pointer active:bg-blue-200 transition-colors duration-200 rounded-xl" onClick={() => {
                navigate(`/tareas/${id}/editar`)
            }}>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                <span className="font-semibold">Editar Tarea</span>
            </div>
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