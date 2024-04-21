import express, { Express, Request, Response } from 'express'
import * as database from './config/database'
import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
const app: Express = express()
const PORT: number = 8000;

app.set('view engine', 'pug');
app.set('views', './views');
dotenv.config();
database.connect();

app.get('/topics', (req: Request, res: Response) => {
  res.render('client/pages/topics/index')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})