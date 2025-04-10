import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function DoneTask({ id }: { id: string | number | undefined }) {
    const [tareaInfo, setTareaInfo] = useState(null)

    const completarTarea = async (id) => {
        try {
            const respuesta = await fetch(`http://localhost:3000/tareas/${id}/completar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!respuesta.ok) {
                const error = new Error('Error al completar la tarea')
                throw error
            }
            const data = await respuesta.json()
            if (data.success) {
                alert(data.success)
            }
            setTareaInfo(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (tareaInfo !== null) {
            console.log('Tarea completada', tareaInfo)
        }
    }, [tareaInfo])

    return (
        <>
            <div className="absolute top-2 right-4 done-task-button">
                <motion.button
                    className="flex items-center gap-2 px-4 py-2 bg-[#10B981] dark:bg-[#34D399] text-white rounded-md shadow-md cursor-pointer"
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 5px 15px rgba(16, 185, 129, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                    }}
                    onClick={() => completarTarea(id)}
                >
                    <span>Completada</span>
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2
                        }}
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </motion.svg>
                </motion.button>
            </div>
        </>
    )
}

export default DoneTask;