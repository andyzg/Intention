import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { completeTask } from '@/controller/task';
import { db } from '@/data/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(async (req: Request, res: Response, next) => {
  const accessToken = req.get('Authorization')
  const refreshToken = req.get('Refresh')

  if (!accessToken) {
    res.status(401).send('Unauthorized');
    return;
  } else {
    const accessTokenWithoutBearer = accessToken.split(' ')[1];
    const resp = await db.auth.setSession({
      access_token: accessTokenWithoutBearer as string,
      refresh_token: refreshToken as string,
    });
    next();
  }
});

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
