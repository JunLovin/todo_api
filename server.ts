import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 3000

import { obtenerTodasLasTareas, obtenerTareaPorId, crearNuevaTarea, eliminarTareaPorId, actualizarTareaPorId } from './src/server/utils.ts'

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/tareas', obtenerTodasLasTareas)

app.get('/tareas/:id', obtenerTareaPorId)

app.post('/tareas', crearNuevaTarea)

app.put('/tareas/:id', actualizarTareaPorId)

app.delete('/tareas/:id', eliminarTareaPorId)

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})