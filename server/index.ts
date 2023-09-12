import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { completeTask } from '@/controller/task';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/api/completeTask', async (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  console.log(req.body, typeof req.body);
  const { task, session } = req.body;
  await completeTask(task, session);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
