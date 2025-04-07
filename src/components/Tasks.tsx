import React from 'react'

function Tasks({ title, description }) {
    return (
        <>
        <div className="task w-full h-max px-4 py-2 hover:bg-neutral-300 transition-colors duration-300 flex flex-col gap-2 cursor-pointer">
            <div className="task-title">
                <h2 className="leading-normal text-xl font-semibold">{title}</h2>
            </div>
            <div className="task-description">
                <p>{description?.substring(0, 80) + '...'}</p>
            </div>
        </div>
        </>
    )
}

export default Tasks