import express, { NextFunction, Request, Response } from 'express'
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
const app = express()

app.use(express.json())

app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
    path: req.originalUrl,
  });
});

export default app;