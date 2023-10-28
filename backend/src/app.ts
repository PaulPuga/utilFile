import express from 'express';
import loaders from './loaders';
import config from './config';

const startServer = async () => {
  const app = express();

  await loaders({ expressApp: app });

  app.set('PORT', config.port);

  app.listen(app.get('PORT'), () => {
    console.log(`✅ Server listening on port ${app.get('PORT')}.`);
  });
};

startServer();
