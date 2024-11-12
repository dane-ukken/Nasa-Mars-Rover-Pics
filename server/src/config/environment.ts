import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    key: process.env.API_KEY || '',
    baseUri: process.env.BASE_URI || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

const requiredEnvVars = ['API_KEY', 'BASE_URI'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}); 