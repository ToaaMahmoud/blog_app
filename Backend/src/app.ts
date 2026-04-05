import express from 'express'
import cors from 'cors'
import authRouter from './modules/auth/routes/auth.routes'

export const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
const baseUrl = '/api/v1'

app.use(`${baseUrl}/auth`, authRouter)

app.get('/', (req, res) =>{
    res.json({ message: 'Hello, Toaa!' })
})
