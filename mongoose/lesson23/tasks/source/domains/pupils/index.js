// Core
import dg from 'debug';

// Instruments
import { Pupils } from '../../controllers';

const debug = dg('router:pupils');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const pupils = new Pupils(req.body);
        const data = await pupils.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const pupils = new Pupils(req.body);
        const data = await pupils.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
