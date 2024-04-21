import express, { Express} from 'express'
import * as database from './config/database'
import dotenv from 'dotenv';
import Topic from './models/topic.model';
import path from 'path';
import clientRoutes from './routes/client';
const app: Express = express()
const PORT: number = 8000;
// ? Template engine
app.set('view engine', 'pug');
app.set('views', './views');
// ? Public path
path.join(__dirname, './public');
// ? Config
dotenv.config();
database.connect();
// ? Client routes
clientRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})