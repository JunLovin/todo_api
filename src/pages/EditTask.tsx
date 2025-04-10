import React, { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router"

function EditTask() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tareaInfo, setTareaInfo] = useState<any>(null)
    const [error, setError] = useState<boolean>(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const { id } = useParams()
    const navigate = useNavigate()

        const updateTask = async () => {

            if (title === '' ||!title) {
                const error = new Error('El título de la tarea no puede estar vacío')
                setError(true)
                throw error 
            } else {
                setError(false)
            }

            try {
                const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: title,
                        description: description
                    })
                })
                if (!respuesta.ok) {
                    const error = new Error("Hubo un error al actualizar la tarea")
                    throw error
                }
                const respuestaJson = await respuesta.json()
                console.log(respuestaJson)
                alert("Tarea actualizada")
                navigate('/tareas')
            } catch (error) {
                console.error(error)
            }
        }

        const obtenerTarea = async () => {
            try {
                const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, { method: 'GET' })
                if (!respuesta.ok) {
                    const error = new Error("Hubo un error al obtener la tarea")
                    throw error
                }
                const respuestaJson = await respuesta.json()
                setTareaInfo(respuestaJson)
            } catch (error) {
                console.error(error)
            }
        }

        const handleTitle = (e) => {
            setTitle(e.target.value)
        }
    
        const handleDescription = (e) => {
            setDescription(e.target.value)
        }
        
        useEffect(() => {
            obtenerTarea()
        }, [])

        useEffect(() => {
            if (tareaInfo !== null) {
                setTitle(tareaInfo.name)
                setDescription(tareaInfo.description)
            }
        }, [tareaInfo])


    return (
        <>
            <div className="flex justify-center create-task items-center min-h-[90dvh]">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 justify-center items-center h-full">
                    <h2 className="text-3xl font-semibold text-center">Actualizar Tarea</h2>
                    <div className="flex relative flex-col gap-2 items-center mb-4 title-task">
                        <label htmlFor="title" className="text-2xl font-semibold">Titulo:</label>
                        { error && (
                        <label htmlFor="title" className="absolute -bottom-5 font-semibold text-red-400">¡El título de la tarea no puede estar vacío!</label>
                        ) }
                        <input type="text" value={title} onChange={handleTitle} id="title" name="title" className="border border-[#E5E7EB] dark:border-[#374151] rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:focus:ring-[#A78BFA]" />
                    </div>
                    <div className="flex flex-col gap-2 items-center description-task">
                        <label htmlFor="description" className="text-2xl font-semibold">Descripción de la nueva tarea:</label>
                        <textarea name="description" id="description" value={description} onChange={handleDescription} className="w-[600px] h-[500px] resize-none rounded-xl border border-[#E5E7EB] dark:border-[#374151] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:focus:ring-[#A78BFA]"></textarea>
                    </div>
                    <div className="submit">
                        <button ref={buttonRef} className="px-6 py-2 bg-[#8B5CF6] dark:bg-[#A78BFA] text-white rounded-md hover:bg-[#7C3AED] dark:hover:bg-[#8B5CF6] transition-colors cursor-pointer" onClick={updateTask}>Actualizar tarea</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTask