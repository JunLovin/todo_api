import express from 'express'
import { obtenerTodasLasTareas, obtenerTareaPorId, crearNuevaTarea, eliminarTareaPorId, actualizarTareaPorId, completarTareaPorId } from '../utils.ts'

const tareasRoutes = express.Router()

tareasRoutes.get('/', obtenerTodasLasTareas)
tareasRoutes.get('/:id', obtenerTareaPorId)
tareasRoutes.post('/', crearNuevaTarea)
tareasRoutes.put('/:id', actualizarTareaPorId)
tareasRoutes.put('/:id/completar', completarTareaPorId)
tareasRoutes.delete('/:id', eliminarTareaPorId)


export default tareasRoutes