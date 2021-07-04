import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const {
  APP_PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE = false,
  USE_FASTIFY,
} = process.env;

if (!APP_PORT || !JWT_SECRET_KEY) {
  throw new Error('[App] Some Issue with .env file');
}

export const config = {
  APP_PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
  USE_FASTIFY,
};
