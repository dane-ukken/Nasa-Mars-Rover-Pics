import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import roverRouter from "./routes/rover";
import fileRouter from "./routes/file";
import { requestLogger } from "./middlewares/logger";
import cors, { CorsOptions } from 'cors';


dotenv.config();
const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
};

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
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

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});


const server = app.listen(port, () => {
  console.log(`[server]: NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`[server]: LOG_LEVEL=${process.env.LOG_LEVEL}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
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