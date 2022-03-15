import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { Connection, createConnection } from 'typeorm';

createConnection().then((connection: Connection) => {
  const app = express();

  app.use(express.json());
  app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

  routes(app);

  app.listen(8000, () => {
    console.log('listening to port 8000');
  });
});
