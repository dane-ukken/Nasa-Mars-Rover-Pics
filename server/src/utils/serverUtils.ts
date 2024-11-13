import { CorsOptions } from 'cors';

export const getCorsOptions = (): CorsOptions => ({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
});

export const getRateLimiterOptions = () => ({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later', 
  standardHeaders: true,
  legacyHeaders: false,
});
