// Core
import dg from 'debug';

// Instruments
import { Subjects } from '../../../controllers';

const debug = dg('router:subjects:seasons');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { subjectsId: id } = req.params;
        const subjects = new Subjects({ id });
        const data = await subjects.findSeason();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { subjectsId } = req.params;
        const subjects = new Subjects({ subjectsId, ...req.body });
        const data = await subjects.findSeason();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
