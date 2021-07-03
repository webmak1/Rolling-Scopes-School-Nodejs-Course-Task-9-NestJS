import * as dotenv from 'dotenv';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

if (
  !DATABASE_HOST ||
  !DATABASE_NAME ||
  !DATABASE_PORT ||
  !DATABASE_USER ||
  !DATABASE_PASSWORD
) {
  throw new Error('[App] Some Issue with .env file');
}

const config: ConnectionOptions = {
  // name: 'rs-school-db',
  type: 'postgres',
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  port: +DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
