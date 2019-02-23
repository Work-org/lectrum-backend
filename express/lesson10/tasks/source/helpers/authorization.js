import { getEnv as env } from './getEnv';
import dg from 'debug';

const debug = dg('server:auth');
export const authorization = () => (req, res, next)  => {
    try {
        if (req.headers.authorization === env("PASSWORD")) {
            next();
            return;
        }
    
        res.status(401).send('Not authorized!');
    } catch (e) {
        debug(e.message);
        res.status(500).send('Authorization failed.');
    }
};