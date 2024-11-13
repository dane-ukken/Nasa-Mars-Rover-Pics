import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

process.env.API_KEY = 'test_api_key';
process.env.BASE_URI = 'https://api.test.com/v1';
process.env.PORT = '3000';
process.env.NODE_ENV = 'test'; 