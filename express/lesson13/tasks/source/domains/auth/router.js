// Core
import express from 'express';

// Handlers
import * as authenticate from './';

const route = express.Router();

route.post('/login', authenticate.post);
route.get('/list', authenticate.list);

export { route as auth };
