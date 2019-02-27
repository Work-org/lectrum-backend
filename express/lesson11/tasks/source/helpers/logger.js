import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const serverFormat = printf(
    ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
);

const errorFormat = printf(
    ({ level, message, label, timestamp }) => `${timestamp} ${label}: ${message}`,
);

export const devLogger = createLogger({
    level:      'debug',
    format:     combine(label({ label: 'server' }), timestamp(), serverFormat),
    transports: [ new transports.Console() ],
});

export const errorLogger = createLogger({
    level:      'error',
    format:     combine(label({ label: 'server' }), timestamp(), errorFormat),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
});
