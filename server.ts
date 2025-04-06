import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
const app = express()
const PORT = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/nombre', (req, res) => {
    const nombre:string = req.body.nombre || "Usuario"
    res.json({nombre: nombre})
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})