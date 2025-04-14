import React, { useState, useRef } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"

function CreateTask() {
    const [title, setTitle] = useState('Untitled')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<boolean>(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()

    const createTask = async () => {

        if (title === '' || !title) {
            const error = new Error('El título de la tarea no puede estar vacío')
            setError(true)
            throw error
        } else {
            setError(false)
        }

        try {
            const respuesta = await fetch(`http://localhost:3000/tareas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: title,
                    description: description
                })
            })
            if (!respuesta.ok) {
                const error = new Error('Error al crear la tarea')
                throw error
            } 
            const respuestaJson = await respuesta.json()
            console.log(respuestaJson)
            navigate('/tareas')
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

    return (
        <>
        <motion.div
            initial={{
                opacity: 0,
                x: '-20%',
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center text-center min-h-[90dvh] gap-2"
        >
        <h2 className="my-4 text-xl font-semibold leading-normal">{title}</h2>
        <div className="flex justify-center items-center create-task">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 justify-center items-center h-full w-5xl">
                <div className="flex relative flex-col gap-2 items-center mb-8 w-full title-task">
                    <input type="text" value={title} onChange={handleTitle} placeholder={`${error ? "¡El título de la tarea no puede estar vacío!" : "Tarea..."}`} id="title" name="title" className="text-3xl font-bold dark:border-[#374151] rounded-md px-4 py-2 w-full outline-0 placeholder:text-neutral-500"/>
                </div>
                <div className="flex flex-col gap-2 items-center w-full description-task">
                    <textarea name="description" id="description" value={description} placeholder="Descripción..." onChange={handleDescription} className="h-[500px] resize-none rounded-xl dark:border-[#374151] px-4 py-3 w-full outline-0 text-2xl placeholder:text-neutral-500"></textarea>
                </div>
                <div className="submit">
                    <button  ref={buttonRef} className="px-6 py-2 w-60 h-12 bg-[#8B5CF6] dark:bg-[#A78BFA] text-white rounded-md hover:bg-[#7C3AED] dark:hover:bg-[#8B5CF6] transition-colors cursor-pointer" onClick={createTask}>Crear nueva tarea</button>
                </div>
            </form>
        </div>
        </motion.div>
        </>
    )
}

export default CreateTask