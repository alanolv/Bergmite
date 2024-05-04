import { Router } from 'express'
import { userController } from '../controllers/user.js'

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new userController({ userModel })

  userRouter.post('/', userController.create)

  userRouter.get('/:id', userController.getById)//getbyemail
  userRouter.delete('/:id', userController.delete)
  userRouter.patch('/:id', userController.update)

  return userRouter
}