import React, { useRef } from 'react'

function Tasks({ title, description, id }) {
    const deleteTaskRef = useRef<any>(null)

    const deleteTask = async () => {
        try {
            const respuesta = await fetch(`http://localhost:3000/tareas/${id}`, {
                method: 'DELETE'
            })
            if (!respuesta.ok) {
                const error = new Error("Hubo un error al eliminar la tarea.")
                throw error
            }
            const respuestaJson = await respuesta.json()
            console.log("Tarea eliminada", respuestaJson)
            alert("Se eliminó la tarea, para ver los cambios por favor reinicia la página.")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
        <div className="task w-full h-max px-4 py-2 hover:bg-neutral-300 transition-colors duration-300 flex flex-col gap-2 cursor-pointer relative" onMouseEnter={() => {
            deleteTaskRef.current.classList.remove('hidden')
            deleteTaskRef.current.classList.add('flex')
        }} onMouseLeave={() => {
            deleteTaskRef.current.classList.remove('flex')
            deleteTaskRef.current.classList.add('hidden')
        }}>
            <div className="task-title">
                <h2 className="leading-normal text-xl font-semibold">{title}</h2>
            </div>
            <div className="task-description">
                <p>{description?.substring(0, 80) + '...'}</p>
            </div>
            <div className="delete-task absolute right-0 top-0 h-full w-12 bg-red-100 hidden justify-center items-center z-10 text-red-400 cursor-pointer" onClick={deleteTask} ref={deleteTaskRef}>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </div>
        </div>
        </>
    )
}

export default Tasks