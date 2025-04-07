import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 3000

import { tasks, createTask, findTask, deleteTask, updateTask } from './src/server/db.ts'

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/tareas', (req, res) => {
    res.json(tasks)
})

app.get('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const task = findTask(id)
    res.json(task)
})

app.post('/tareas', (req, res) => {
    const { title, description } = req.body
    const newTask = createTask(title, description)
    res.json(newTask)
})

app.put('/tareas/:id', (req, res) => {
    const { title, description } = req.body
    const id = parseInt(req.params.id)
    updateTask(id, title, description)
    res.json(tasks)
})

app.delete('/tareas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    deleteTask(id)
    res.json(tasks)
})

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})