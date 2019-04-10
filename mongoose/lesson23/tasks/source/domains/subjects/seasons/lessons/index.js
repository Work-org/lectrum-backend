// Core
import dg from 'debug';

// Instruments
import { Subjects } from '../../../../controllers';

const debug = dg('router:subjects:lessons');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { subjectsId, seasonId } = req.params;
        const subjects = new Subjects({ subjectsId, seasonId });
        const data = await subjects.findLesson();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { subjectsId, seasonId } = req.params;
        const subjects = new Subjects({
            subject: subjectsId,
            season:  seasonId,
            ...req.body,
        });
        const data = await subjects.findLesson();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
