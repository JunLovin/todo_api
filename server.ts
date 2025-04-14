import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import tareasRoutes from './src/server/routes/tareas.routes.ts'
import tareasCompletadasRoutes from './src/server/routes/tareasCompletadas.routes.ts'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use('/tareas', tareasRoutes)

app.use('/tareascompletadas', tareasCompletadasRoutes)

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})