import React from "react"
import { motion } from "framer-motion"

function AskName() {
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
                className="flex justify-center items-center min-h-screen flex-col gap-2"
            >
                <h1 className="text-center text-5xl font-extrabold leading-normal">Bienvenido!</h1>
                <p>Este repositorio es una práctica para aprender acerca del backend y las bases de datos. Si estás interesado en leer el código podrías revisar el     repositorio desde GitHub.</p>
                <motion.button className="border rounded-full border-black bg-white w-40 h-12 cursor-pointer font-semibold"
                    whileHover={{ background: '#000', color: '#fff', borderColor: '#fff', scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    onClick={() => {
                        window.open('https://github.com/JunLovin/todo_api', '_blank')
                    }}
                >Repositorio</motion.button>
            </motion.div>
        </>
    )
}

export default AskName