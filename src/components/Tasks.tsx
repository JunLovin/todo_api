import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Tasks({ title, description, id }) {
    const deleteTaskRef = useRef<any>(null)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const deleteTask = async () => {
        try {
            setIsDeleting(true)
            const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
                method: 'DELETE'
            })
            if (!respuesta.ok) {
                const error = new Error("Hubo un error al eliminar la tarea.")
                setIsDeleting(false)
                throw error
            }
            location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {!isDeleting ? (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            x: -100,
                            scale: 0.8,
                            backgroundColor: "#FEE2E2",
                            transition: {
                                duration: 0.5,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        <div className="task w-full h-max px-4 py-2 hover:bg-neutral-300 transition-colors duration-300 flex flex-col gap-2 cursor-pointer relative" onMouseEnter={() => {
                            deleteTaskRef.current.classList.replace("opacity-0", "opacity-100")
                        }} onMouseLeave={() => {
                            deleteTaskRef.current.classList.replace("opacity-100", "opacity-0")
                        }}>
                            <div className="task-title">
                                <h2 className="leading-normal text-xl font-semibold">{title}</h2>
                            </div>
                            <div className="task-description w-[90%]">
                                <p>{description?.substring(0, 80) + '...'}</p>
                            </div>
                            <div className="delete-task absolute right-0 transition-all duration-200 opacity-0 top-0 h-full w-12 bg-red-100 flex justify-center items-center z-10 text-red-400 cursor-pointer" onClick={deleteTask} ref={deleteTaskRef}
                            >
                                <motion.svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                                    whileHover={{
                                        rotate: 180,
                                        scale: 1.2,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{
                                        scale: 0.9
                                    }}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></motion.svg>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    )
}

export default Tasks