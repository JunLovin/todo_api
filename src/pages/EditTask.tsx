import React, { useState } from "react"
import { useParams } from "react-router"

function EditTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams()

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

        const updateTask = async () => {
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
            } catch (error) {
                console.error(error)
            }
        }

    return (
        <>
            <div className="create-task flex justify-center">
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-semibold text-center">Actualizar Tarea</h2>
                    <div className="title-task flex flex-col items-center gap-2">
                        <label htmlFor="title" className="font-semibold text-2xl">Titulo:</label>
                        <input type="text" value={title} onChange={handleTitle} id="title" name="title" className="border border-[#E5E7EB] dark:border-[#374151] rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:focus:ring-[#A78BFA]" />
                    </div>
                    <div className="description-task flex flex-col items-center gap-2">
                        <label htmlFor="description" className="font-semibold text-2xl">Descripción de la nueva tarea:</label>
                        <textarea name="description" id="description" value={description} onChange={handleDescription} className="w-[600px] h-[500px] resize-none rounded-xl border border-[#E5E7EB] dark:border-[#374151] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] dark:focus:ring-[#A78BFA]"></textarea>
                    </div>
                    <div className="submit">
                        <button className="px-6 py-2 bg-[#8B5CF6] dark:bg-[#A78BFA] text-white rounded-md hover:bg-[#7C3AED] dark:hover:bg-[#8B5CF6] transition-colors cursor-pointer" onClick={updateTask}>Actualizar tarea</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTask