import express from 'express'
import { eliminarTareaCompletadaPorId, obtenerTodasLasTareasCompletadas, obtenerTareaCompletadaPorId } from '../utils.ts'

const tareasCompletadasRoutes = express.Router()

tareasCompletadasRoutes.get('/', obtenerTodasLasTareasCompletadas)

tareasCompletadasRoutes.get('/:id', obtenerTareaCompletadaPorId)

tareasCompletadasRoutes.delete('/:id', eliminarTareaCompletadaPorId)

export default tareasCompletadasRoutes