import { pool } from './db.ts'
import express from 'express'

export const obtenerTodasLasTareas = async (req: express.Request, res: express.Response) => {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC')
    if (!rows) {
        res.status(404).json({ error: "No se encontraron las tareas D:" })
        return
    }
    res.status(200).json(rows)
}

export const obtenerTareaPorId = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const { rows, rowCount } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "Tarea no encontrada" })
        return
    }

    res.status(200).json(rows[0])
}

export const crearNuevaTarea = async (req: express.Request, res: express.Response) => {
    const { name, description } = req.body
    const { rowCount } = await pool.query('INSERT INTO tasks (name, description) VALUES ($1, $2)', [name, description])

    if (rowCount !== 1) {
        res.status(500).json({ error: "Hubo un error en el servidor, inténtelo más tarde." })
    }

    res.status(200).json({ success: "Se creó la nueva tarea exitosamente" })
}

export const actualizarTareaPorId = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const { name, description } = req.body
    const { rowCount } = await pool.query('UPDATE tasks SET name = $1, description = $2 WHERE id = $3', [name, description, id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "No se encontró la tarea :(" })
    }

    res.status(200).json({ success: "Se actualizó la tarea correctamente." })
}

export const completarTareaPorId = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const checkTask = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])

        if (checkTask.rowCount !== 1) {
            return res.status(404).json({ error: "No se encontró la tarea :(" })
        }

        const { rowCount } = await pool.query('UPDATE tasks SET completed = true WHERE id = $1 RETURNING *', [id])
    
        if (rowCount !== 1) {
            return res.status(404).json({ error: "No se pudo completar la tarea." })
        }
    
        return res.status(200).json({ success: "Se completó la tarea correctamente." })
    } catch (error) {
        console.error("Hubo un error al completar la tarea:", error)
        return res.status(500).json({ error: "Hubo un error en el servidor, inténtelo más tarde.", details: error})
    }
}

export const eliminarTareaPorId = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "No se encontró la tarea." })        
    }
    res.status(204).json({ success: "Se eliminó la tarea" })
}

// ? ENDPOINTS PARA TAREAS COMPLETADAS

export const obtenerTodasLasTareasCompletadas = async (req: express.Request, res: express.Response) => {
    const { rows } = await pool.query('SELECT * FROM "completedTasks"')

    if (rows.length === 0) {
        res.status(404).json({ error: "No se encontraron las tareas completadas :(" })
        return
    }

    res.status(200).json(rows)
}

export const obtenerTareaCompletadaPorId = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const { rows, rowCount } = await pool.query('SELECT * FROM "completedTasks" WHERE id = $1', [id])

    if (rowCount !== 1) {
        res.status(404).json({ error: "No se encontró la tarea :(" })
        return
    }

    res.status(200).json(rows[0])
}

export const eliminarTareaCompletadaPorId = async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const { rowCount } = await pool.query('DELETE FROM "completedTasks" WHERE id = $1', [id])

    if (rowCount!== 1) {
        res.status(404).json({ error: "No se encontró la tarea :(" })
        return
    }

    res.status(204).json({ success: "Se eliminó la tarea" })
}