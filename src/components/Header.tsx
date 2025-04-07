import { Link } from 'react-router-dom'
import React from 'react'

function Header() {
    return (
        <>
        <header className="w-full flex justify-between px-12 h-[70px] items-center bg-neutral-300">
            <div className="header-left">
                <h1 className="text-3xl font-bold">ToDo Api</h1>
            </div>
            <div className="header-right">
                <ul className="flex justify-around gap-8">
                    <Link to="/"><li>Inicio</li></Link>
                    <Link to="/tareas"><li>Tareas</li></Link>
                    <Link to="/contacto"><li>Contáctame</li></Link>
                </ul>
            </div>
        </header>
        </>
    )
}

export default Header