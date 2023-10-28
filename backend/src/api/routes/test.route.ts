import { Router } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/test-api', route);

  /**
   * CHECK IF THE ROUTES WORKS FINE
   */
  route.get('/', (req, res) => {
    res.sendStatus(200);
  });
  route.get('/', (req, res) => {
    res.json({ message: 'HELLO WORLD' });
  });
};
