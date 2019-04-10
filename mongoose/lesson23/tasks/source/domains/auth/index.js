// Core
import dg from 'debug';

// Instruments
import { Users } from '../../controllers';

const debug = dg('router:auth');

export const post = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { email, password } = req.body;
        const emailDecoded = Buffer.from(email, 'base64').toString();
        const passwordDecoded = Buffer.from(password, 'base64').toString();

        req.session.user = { email: emailDecoded };
        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { email, password } = req.body;
        const user = new Users({ email, password });

        await user.register();

        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
