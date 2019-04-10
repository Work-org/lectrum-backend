// Core
import dg from 'debug';

// Instruments
import { Teachers } from '../../controllers';

const debug = dg('router:teachers');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const teachers = new Teachers();
        const data = await teachers.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const teachers = new Teachers(req.body);
        const data = await teachers.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
