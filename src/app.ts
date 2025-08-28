import express from 'express'
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
const app = express()

app.use(express.json())

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;