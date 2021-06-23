import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { PORT, NODE_ENV, JWT_SECRET_KEY, AUTH_MODE = false } = process.env;

if (!PORT) {
  throw new Error('[App] Some Issue with .env file');
}

export const config = {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  AUTH_MODE,
};
