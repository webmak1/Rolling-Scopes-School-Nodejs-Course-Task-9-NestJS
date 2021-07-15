import { Logger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
// import('winston-daily-rotate-file');

const options = {
  fileError: {
    level: 'error',
    filename: `${__dirname}/../../logs/error.log`,
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
  },
};

const logger = createLogger({
  transports: [new transports.File(options.fileError)],
  format: format.combine(format.timestamp(), format.prettyPrint()),
  exitOnError: false,
});

export class MyLogger extends Logger {
  error(message: string, trace: string) {
    logger.error(message);
    super.error(message, trace);
  }
}
