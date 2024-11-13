import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import roverRouter from "./routes/rover";
import fileRouter from "./routes/file";
import { requestLogger } from "./middlewares/logger";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { getCorsOptions, getRateLimiterOptions } from "./utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(getCorsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(express.static('public'));
app.use(rateLimit(getRateLimiterOptions()));

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.send("Little Mars Health Check");
});
apiRouter.use('/rovers', roverRouter);
apiRouter.use('/file', fileRouter);
app.use('/api/v1', apiRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});


const server = app.listen(port, () => {
  console.log(`[server]: NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`[server]: LOG_LEVEL=${process.env.LOG_LEVEL}`);
  console.log(`[server]: Server is running at http://${process.env.DOMAIN}:${port}`);
});

server.on('error', (error) => {
  console.error('[server]: Error starting server:', error);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;