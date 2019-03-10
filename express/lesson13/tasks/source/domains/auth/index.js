// Core
import dg from 'debug';

const debug = dg('router:auth');

export const post = (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);
    
    try {
        const { email, password } = req.body;
        const emailDecoded = Buffer.from(email, 'base64').toString();
        const passwordDecoded = Buffer.from(password, 'base64').toString();
       
        req.session.user = {
            payload:  {
                email: emailDecoded
            },
            agent:    req.headers['user-agent'],
            start:    new Date(),
            end:      new Date(Date.now() + 3600000),
            authType: 'cookie'
        };
        res.sendStatus(204);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


export const list = (req, res) => {
    if (!req.session.user) {
        res.sendStatus(401);
    }
    
    res.status(200).json({sessions: req.session.getAll()})
};