import React, { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router"

function Principal() {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const createTask = async () => {

        if (name === '' || !name) {
            const error = new Error("El nombre de la tarea no puede estar vacía")
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
                    name: name,
                    descripstion: description
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
                className="flex justify-around items-center min-h-[90dvh] gap-3"
            >
                <div className="principal-left flex flex-col gap-3">
                    <h2 className="text-5xl font-extrabold leading-normal">¡Bienvenido!</h2>
                    <p className="max-w-[60ch] mx-auto leading-normal">Este repositorio es una práctica para aprender acerca del backend y las bases de datos. Si estás interesado en leer el código podrías revisar el repositorio desde GitHub.</p>
                    <motion.button className="border rounded-full border-[#1F2937] dark:border-[#F9FAFB] mt-4 bg-[#F9FAFB] dark:bg-[#111827] w-45 h-14 text-xl cursor-pointer font-semibold"
                    whileHover={{ 
                    background: '#8B5CF6', 
                    color: '#fff', 
                    borderColor: '#8B5CF6', 
                    scale: 1.1 
                    }}
                    whileTap={{ scale: 1 }}
                    onClick={() => {
                        window.open('https://github.com/JunLovin/todo_api', '_blank')
                    }}
                    >Repositorio</motion.button>
                </div>
                <div className="principal-right flex flex-col gap-3">
                    <h2 className="text-5xl font-extrabold leading-normal">Crea una nueva tarea</h2>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                        <div className={`name flex flex-col gap-2 items-center relative ${error ? 'mb-4' : 'mb-0'}`}>
                            <label htmlFor="name" className="font-semibold text-xl">Nombre de la tarea:</label>
                            <input type="text" id="name" placeholder="Ir de compras..." name="name" value={name} onChange={handleName} className="border border-[#E5E7EB] dark:border-[#374151] rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:focus:ring-[#A78BFA]"/>
                            { error && (
                                <label htmlFor="name" className="text-red-400 font-semibold absolute left-0 -bottom-5.5">El nombre de la tarea no puede estar vacía</label>
                            ) }
                        </div>
                        <div className="description flex flex-col gap-2 items-center">
                            <label htmlFor="description" className="font-semibold text-xl">Descripción de la tarea:</label>
                            <textarea id="description" placeholder="Ir de compras a la plaza..." name="description" value={description} onChange={handleDescription} className="w-full h-30 resize-none rounded-xl border border-[#E5E7EB] dark:border-[#374151] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:focus:ring-[#A78BFA]"></textarea>
                        </div>
                        <div className="button w-full flex justify-center">
                            <button className="px-6 py-2 bg-[#8B5CF6] dark:bg-[#A78BFA] text-white rounded-md hover:bg-[#7C3AED] dark:hover:bg-[#8B5CF6] transition-colors cursor-pointer" onClick={createTask}>Crear nueva tarea</button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </>
    )
}

export default Principal