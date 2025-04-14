import React, { useState, useEffect }  from 'react'
import { useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

function CompletedTaskDescription() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [completedTaskInfo, setCompletedTaskInfo] = useState<any>(null)
    const { id } = useParams()

    const fetchCompletedTaskById = async (id) => {
        const taskId = id ? Number(id) : null
        if (id) {
        try {
            setIsLoading(true)
            const respuesta = await fetch(`http://localhost:3000/tareascompletadas/${taskId}`, {
                method: 'GET',
            })
            if (!respuesta.ok) {
                setIsLoading(false)
                throw new Error('Error al obtener la tarea')
            }
            const data = await respuesta.json()
            setCompletedTaskInfo(data)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
        } else {
            setIsLoading(false)
            return
        }
    }

    useEffect(() => {
        if (id) {
            fetchCompletedTaskById(id)
        }
    }, [id])

    if (isLoading) {
        return (
            <div className="flex relative flex-col gap-2 justify-center items-center py-4 w-full h-full task-descriptions-placeholder">
                <motion.div
                    className="w-3/4 h-[80vh] bg-[#E5E7EB] dark:bg-[#374151] rounded-lg flex flex-col items-center justify-center"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <div className="h-8 w-1/3 bg-[#E5E7EB] dark:bg-[#374151] rounded mb-8"></div>
                    <div className="h-4 w-2/3 bg-[#E5E7EB] dark:bg-[#374151] rounded mb-3"></div>
                    <div className="h-4 w-2/3 bg-[#E5E7EB] dark:bg-[#374151] rounded mb-3"></div>
                    <div className="h-4 w-1/2 bg-[#E5E7EB] dark:bg-[#374151] rounded"></div>
                </motion.div>
            </div>
        )
    }

    return (
        <>
        <AnimatePresence mode="wait">
        <motion.div
        key={id}
        initial={{ opacity: 0, y: 20, scale: 0.95  }}
        animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
                staggerChildren: 0.1
            }
        }}
        exit={{
            opacity: 0,
            y: -20,
            scale: 0.95,
            transition: {
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0],
            }
        }}
        transition={{ duration: 0.5 }}
        className="flex relative flex-col justify-center items-center py-4 w-full h-full task-descriptions"
        >
            <div className="task-description-container w-3/4 min-h-[80vh] bg-[#F3F4F6] dark:bg-[#1F2937] rounded-lg p-6 flex flex-col items-center gap-2 transition-colors duration-200">
                <motion.div className="task-des-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: 0.1,
                        duration: 0.4
                    }
                }}
                >
                    <h2 className="text-4xl font-bold leading-normal text-center">{completedTaskInfo?.name}</h2>
                </motion.div>
                <motion.div className="leading-normal text-center task-des-des"
                initial={{
                    opacity: 0,
                    y: 10
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: 0.2,
                        duration: 0.4
                    }
                }}
                >
                    <p className="w-max-[60ch] font-normal leading-normal text-center">{completedTaskInfo?.description}</p>
                </motion.div>
                <motion.img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHhzN2E4Z3RscG9iZ2o1c3hmdzBzaHY1ZHY4aTZ2azFvaXFqdDhwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif" alt=""
                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                        delay: 0.3,
                        duration: 0.5
                    }
                }}
                whileHover={{
                    scale: 1.02
                }}
                />
            </div>
            </motion.div>
            </AnimatePresence>
        </>
    )
}

export default CompletedTaskDescription