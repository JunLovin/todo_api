import React, { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"

function CreateTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const createTask = async () => {
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
        >
        <div className="create-task flex justify-center">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-4">
                <div className="title-task flex flex-col items-center gap-2">
                    <label htmlFor="title" className="font-semibold text-2xl">Nombre de la nueva tarea:</label>
                    <input type="text" value={title} onChange={handleTitle} id="title" name="title" className="border border-black rounded-xl px-2 outline-none"/>
                </div>
                <div className="description-task flex flex-col items-center gap-2">
                    <label htmlFor="description" className="font-semibold text-2xl">Descripción de la nueva tarea:</label>
                    <textarea name="description" id="description" value={description} onChange={handleDescription} className="w-[600px] h-[500px] resize-none rounded-xl border border-black"></textarea>
                </div>
                <div className="submit">
                    <button className="w-50 h-12 bg-black hover:bg-white hover:border hover:border-black active:bg-neutral-100 transition-colors duration-300 cursor-pointer text-xl text-white hover:text-black rounded-full flex items-center justify-center" onClick={createTask}>Crear nueva tarea</button>
                </div>
            </form>
        </div>
        </motion.div>
        </>
    )
}

export default CreateTask