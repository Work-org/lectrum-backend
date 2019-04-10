// Core
import dg from 'debug';

// Instruments
import { Classes } from '../../controllers';

const debug = dg('router:classes');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const classes = new Classes();
        const data = await classes.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const classes = new Classes(req.body);
        const data = await classes.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
