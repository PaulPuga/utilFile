import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '../config';
import routes from '../api';
import {
  // logErrors,
  boomErrorHandler,
  errorHandler,
} from '../errors/error.handler';

export default ({ app }: { app: express.Application }) => {
  /**
   * Morgan logger
   */
  app.use(morgan(config.logs.morganLogType));

  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.sendStatus(200);
  });
  /**
   * Allows external clients to make HTTP requests to Express application.
   */
  app.use(cors());
  /**
   * Using json with express
   */
  app.use(express.json());

  /**
   * API Router
   */
  app.use(config.api.prefix, routes());

  /**
   * Errors Handlers
   */
  //app.use(logErrors); // TODO: Implement library to handle with logs
  app.use(boomErrorHandler); // Middleware to handle with the @hapi/boom errors
  app.use(errorHandler); // Last error handler with 500 response
};
