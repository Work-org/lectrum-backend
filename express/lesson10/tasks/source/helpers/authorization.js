import { getEnv as env } from './getEnv';
import dg from 'debug';

const debug = dg('server:auth');
const pass = env("PASSWORD");

export const authorization = () => (req, res, next)  => {
    try {
        if (req.headers.authorization === pass) {
            return next();
        }
    
        res.status(401).send('Not authorized!');
    } catch (e) {
        debug(e.message);
        res.status(500).send('Authorization failed.');
    }
};