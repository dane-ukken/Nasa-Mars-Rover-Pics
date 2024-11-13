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

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Little Mars Health Check");
});
apiRouter.use('/rovers', roverRouter);
apiRouter.use('/file', fileRouter);

app.use('/api/v1', apiRouter);

app.listen(port)
  .on('listening', () => {
  console.log(`[server]: NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`[server]: LOG_LEVEL=${process.env.LOG_LEVEL}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
.on('error', (error) => {
  console.error('[server]: Error starting server:', error);
});

export default app;