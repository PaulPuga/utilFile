import { Router } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/test-api', route);
  route.get('/', (req, res) => {
    res.json({ message: 'HELLO WORLD' });
  });
};
