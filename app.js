import express, { json } from 'express' // require -> commonJS
import { createUserRouter } from './routes/users.js'
import { createInstituteRouter } from './routes/institute,js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

export const createApp = ({ userModel , instituteModel}) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/user', createUserRouter({ userModel }))
  app.use('/institute', createInstituteRouter({ instituteModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}