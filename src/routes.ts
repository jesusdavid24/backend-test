import { Application } from 'express';

import healthcheckRouter from './api/healthcheck';
import tournamentRouter from './api/tournament';
import userRouter from './api/user';
import authLocalRouter from './auth/local';
import checkoutRouter from './api/checkout';
import rolesRouter from './api/roles';

const routes = (app: Application) => {
  app.use('/api/healthcheck', healthcheckRouter);
  app.use('/api/users', userRouter);
  app.use('/api/tournament', tournamentRouter);
  app.use('/api/checkout', checkoutRouter);
  app.use('/api/roles', rolesRouter);

  //Auth
  app.use('/auth/local', authLocalRouter);
};

export default routes;