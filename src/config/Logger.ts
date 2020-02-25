import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint } = format;

const Logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()],
  exitOnError: false,
});

export default Logger;
