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
                        id: id,
                        title: title,
                        description: description
                    })
                })
                if (!respuesta.ok) {
                    const error = new Error("Hubo un error al actualizar la tarea")
                    throw error
                }
                const respuestaJson = await respuesta.json()
                console.log("Se actualizó correctamente la tarea, " + respuestaJson)
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
                        <input type="text" value={title} onChange={handleTitle} id="title" name="title" className="border border-black rounded-xl px-2 outline-none" />
                    </div>
                    <div className="description-task flex flex-col items-center gap-2">
                        <label htmlFor="description" className="font-semibold text-2xl">Descripción de la nueva tarea:</label>
                        <textarea name="description" id="description" value={description} onChange={handleDescription} className="w-[600px] h-[500px] resize-none rounded-xl border border-black"></textarea>
                    </div>
                    <div className="submit">
                        <button className="w-50 h-12 bg-black hover:bg-white hover:border hover:border-black active:bg-neutral-100 transition-colors duration-300 cursor-pointer text-xl text-white hover:text-black rounded-full flex items-center justify-center" onClick={updateTask}>Actualizar tarea</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTask