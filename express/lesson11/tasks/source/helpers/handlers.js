import { errorLogger } from './logger';

export const notFoundHandler = (req, res, next) => {
    errorLogger.log({
        level: 'error',
        message: 'Not found route ' + req.url
    });
    res.sendStatus(404);
};

export const errorHandler = (err, req, res, next) => {
    errorLogger.log({
        level: 'error',
        message: err.message
    });
    res.status(500).json({ message: err.message });
};