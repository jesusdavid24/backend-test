import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import productRouter from './api/tournament';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import checkoutRouter from './api/checkout'

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter)
  app.use('/api/users', userRouter)
  app.use('/api/products', productRouter)
  app.use('/api/checkout', checkoutRouter)

  //Auth
  app.use('/auth/local', authLocalRouter)
}

export default routes