import express, { NextFunction, Request, Response } from 'express'
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors({origin: ['http://localhost:5173','http://localhost:5174','https://library-management-client-psi-sage.vercel.app']}))
// {
    // origin: ['http://localhost:5173', 'live-deploy-url']
  //  } aikhane orgin mane kii ??

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