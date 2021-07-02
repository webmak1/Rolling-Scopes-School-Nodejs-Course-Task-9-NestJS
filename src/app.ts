import { Application, NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { protect } from 'middleware/auth';
import * as path from 'path';
import 'reflect-metadata';
import { router as boardRouter } from 'resources/boards/board.router';
import { router as loginRouter } from 'resources/login/login.router';
import { router as taskRouter } from 'resources/tasks/task.router';
import { router as userRouter } from 'resources/users/user.router';
import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';
// import { writeAccessLog, writeErrorLog } from './common/loggingConfig';
import express = require('express');

const app: Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((_req: Request, _res: Response, next: NextFunction) => {
  // writeAccessLog(req);
  next();
});

// Команды вызова исключений!

// uncaughtException
// throw Error('Oops! uncaughtException Happened!');

// unhandledRejection
// Promise.reject(Error('Oops! unhandledRejection Happened!'));

app.use('/login', loginRouter);
app.use('/users', protect, userRouter);
app.use('/boards', protect, boardRouter);
boardRouter.use('/:boardId/tasks', protect, taskRouter);
app.use('/tasks', protect, taskRouter);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.name = getReasonPhrase(StatusCodes.NOT_FOUND);
  next(err);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // writeErrorLog(err, req);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: err.name,
    message: err.message,
  });
});

export { app };
