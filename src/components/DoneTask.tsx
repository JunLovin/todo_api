import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'

function DoneTask({ id, done = false }: { id: string | number | undefined, done: boolean }) {
    const [tareaInfo, setTareaInfo] = useState(null)
    const [exito, setExito] = useState<boolean>(false)
    const navigate = useNavigate()

    const completarTarea = async (id: number | string) => {
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
                setExito(true)
                setTimeout(() =>  setExito(false),3000)
                setTimeout(() => navigate('/tareascompletadas'), 1000)
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
                    disabled={done}
                    onClick={() => completarTarea(Number(id))}
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
            <AnimatePresence>
                {exito && (
                    <motion.div 
                        className="fixed right-4 bottom-4 z-50 p-4 text-green-700 bg-green-100 rounded border-l-4 border-green-500 shadow-lg"
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.5 }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25
                        }}
                    >
                        <div className="flex items-center">
                            <motion.div
                                className="p-1 mr-3 bg-green-500 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </motion.div>
                            <motion.p 
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {"¡Tarea completada con éxito!"}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default DoneTask;