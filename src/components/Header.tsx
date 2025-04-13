import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <>
            <header className="w-full flex justify-between px-12 h-[70px] items-center bg-[#8B5CF6] dark:bg-[#A78BFA] text-white font-semibold">
                <div className="header-left">
                    <h1 className="text-3xl font-bold">ToDo Api</h1>
                </div>
                <div className="header-right">
                    <ul className="flex gap-8 justify-around items-center">
                        <Link to="/" className="text-white"><li>Inicio</li></Link>
                        <Link to="/tareas" className="text-white"><li>Tareas</li></Link>
                        <Link to="/tareascompletadas" className="text-white"><li>Tareas completadas</li></Link>
                        <Link to="/contacto" className="text-white"><li>Contáctame</li></Link>
                        <li className="cursor-pointer darkMode" onClick={() => {
                            document.body.classList.toggle('dark')
                            toggleDarkMode()
                        }}>
                            {isDarkMode ? (
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-sun-high"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" /><path d="M6.343 17.657l-1.414 1.414" /><path d="M6.343 6.343l-1.414 -1.414" /><path d="M17.657 6.343l1.414 -1.414" /><path d="M17.657 17.657l1.414 1.414" /><path d="M4 12h-2" /><path d="M12 4v-2" /><path d="M20 12h2" /><path d="M12 20v2" /></svg>
                            ) : (
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-moon-stars"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /><path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /><path d="M19 11h2m-1 -1v2" /></svg>
                            )}
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header