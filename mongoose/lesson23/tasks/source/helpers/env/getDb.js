import { ValidationError } from '../errors';

export const getDb = () => {
    const { DB } = process.env;

    if (!DB) {
        throw new ValidationError('Environment variable DB should be specified', 400);
    }

    if (typeof DB !== 'string') {
        throw new ValidationError('Environment variable DB should be a string', 400);
    }

    return DB;
};
