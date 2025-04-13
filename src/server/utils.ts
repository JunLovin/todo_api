import { pool } from './db.ts'

export const obtenerTodasLasTareas = async (req:any, res:any) => {
    const { rows } = await pool.query('SELECT * FROM tasks')
    if (rows === 0) {
        res.status(404).json({ error: "No se encontraron las tareas D:" })
        return
    }
    res.status(200).json(rows)
}

export const obtenerTareaPorId = async (req, res) => {
    const { id } = req.params
    const { rows, rowCount } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "Tarea no encontrada" })
        return
    }

    res.status(200).json(rows[0])
}

export const crearNuevaTarea = async (req, res) => {
    const { name, description } = req.body
    const { rowCount } = await pool.query('INSERT INTO tasks (name, description) VALUES ($1, $2)', [name, description])

    if (rowCount !== 1) {
        res.status(500).json({ error: "Hubo un error en el servidor, inténtelo más tarde." })
    }

    res.status(200).json({ success: "Se creó la nueva tarea exitosamente" })
}

export const actualizarTareaPorId = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    const { rowCount } = await pool.query('UPDATE tasks SET name = $1, description = $2 WHERE id = $3', [name, description, id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "No se encontró la tarea :(" })
    }

    res.status(200).json({ success: "Se actualizó la tarea correctamente." })
}

export const completarTareaPorId = async (req, res) => {
    const { id } = req.params
    const { rowCount } = await pool.query('UPDATE tasks SET completed = true WHERE id = $1', [id])

    if (rowCount!== 1) {
        res.status(404).json({ error: "No se encontró la tarea :(" })
    }

    res.status(200).json({ success: "Se completó la tarea correctamente." })
}

export const eliminarTareaPorId = async (req, res) => {
    const { id } = req.params
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "No se encontró la tarea." })        
    }
    res.status(204).json({ success: "Se eliminó la tarea" })
}

// ? ENDPOINTS PARA TAREAS COMPLETADAS

export const obtenerTodasLasTareasCompletadas = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM "completedTasks"')

    if (rows.length === 0) {
        res.status(404).json({ error: "No se encontraron las tareas completadas :(" })
        return
    }

    res.status(200).json(rows)
}

export const obtenerTareaCompletadaPorId = async (req, res) => {
    const { id } = req.params
    const { rows } = await pool.query('SELECT * FROM "completedTasks" WHERE id = $1', [id])

    if (rows.length === 0) {
        res.status(404).json({ error: "No se encontró la tarea :(" })
        return
    }

    res.status(200).json(rows[0])
}