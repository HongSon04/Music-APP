import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT: number = 8000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/topics', (req: Request, res: Response) => {
  res.render('client/pages/topics/index')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})