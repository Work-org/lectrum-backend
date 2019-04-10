// Core
import dg from 'debug';

// Instruments
import { Gradebooks } from '../../../controllers';

const debug = dg('router:classes:gradebook');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const gradebooks = new Gradebooks();
        const data = await gradebooks.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const gradebooks = new Gradebooks(req.body);
        const data = await gradebooks.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const put = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = {};

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
