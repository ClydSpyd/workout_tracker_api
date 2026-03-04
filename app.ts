import express from 'express';
import workoutRouters from './modules/workout/workout.routes';
import routineRouters from './modules/routine/routine.routes';
import { errorHandler } from './middleware/error.middleware';

export function createServer() {
  const app = express();
  app.use(express.json());
  app.use('/api/workout', workoutRouters);
  app.use('/api/routine', routineRouters);
  app.use(errorHandler);
  return app;
}
