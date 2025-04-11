import React, { useState, useEffect } from 'react'
import Tasks from '@components/Tasks'

function CompletedTasks() {
    const [tareasCompletadas, setTareasCompletadas] = useState<any>(null)

    const obtenerTareasCompletadas = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/tareascompletadas`, { method: 'GET' })
            if (!respuesta.ok) {
                const error = new Error("Ha ocurrido un error")
                throw error
            }
            const respuestaJson = await respuesta.json()
            setTareasCompletadas(respuestaJson)
            console.log(respuestaJson)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        obtenerTareasCompletadas()
    }, [])

    return (
        <>
        {tareasCompletadas?.map((tarea: any) => {
            return (
                <Tasks
                key={tarea.id}
                id={tarea.id}
                title={tarea.name}
                description={tarea.description}
                />
            )
        })}
        </>
    )
}

export default CompletedTasks