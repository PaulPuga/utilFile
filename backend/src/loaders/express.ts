import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '../config';
import routes from '../api';

export default ({ app }: { app: express.Application }) => {
  /**
   * Morgan logger
   */
  app.use(morgan(config.logs.morganLogType));

  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (req, res) => {
    console.log('🔵 Calling /api/status endpoint');
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
};
