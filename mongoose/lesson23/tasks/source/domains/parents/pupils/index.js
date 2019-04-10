// Core
import dg from 'debug';

// Instruments
import { Parents } from '../../../controllers';

const debug = dg('router:parents:pupils');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const parents = new Parents();
        const data = await parents.findAllPupils();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const parents = new Parents(req.body);
        const data = await parents.createPupils();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
