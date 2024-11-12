import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import roverRouter from "./routes/rover";
import fileRouter from "./routes/file";
import { requestLogger } from "./middlewares/logger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(express.static('public'));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server + Watching");
});

app.use('/rovers', roverRouter);
app.use('/file', fileRouter);

app.listen(port)
  .on('listening', () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
.on('error', (error) => {
  console.error('[server]: Error starting server:', error);
});

export default app;