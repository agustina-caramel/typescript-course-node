import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import toDoRoutes from './routes/toDos';

const app = express();

app.use(json());

app.use('/toDos', toDoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);
