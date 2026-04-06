import express from 'express'
import cors from 'cors'
import authRouter from './modules/auth/routes/auth.routes'
import { connectDB } from './config/db'
import { errorHandler } from './shared/middleware/error.handle.middleware'

export const app = express()
connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
const baseUrl = '/api/v1'

app.use(`${baseUrl}/auth`, authRouter)

app.get('/', (req, res) =>{
    res.json({ message: 'Hello, Toaa!' })
})
app.use(errorHandler);

export default app