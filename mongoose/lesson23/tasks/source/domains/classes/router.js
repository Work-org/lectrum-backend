// Core
import express from 'express';

// Handlers
import * as classes from './';
import * as classId from './class';
import * as gradebook from './gradebook';

// Instruments
import { authenticate } from '../../helpers';

const route = express.Router();

route.get('/', classes.get);
route.post('/', [ authenticate ], classes.post);

route.get('/:classId', [ authenticate ], classId.get);
route.post('/:classId', [ authenticate ], classId.post);
route.put('/:classId', [ authenticate ], classId.put);
route.delete('/:classId', [ authenticate ], classId.remove);

route.get('/:classId/gradebooks', [ authenticate ], gradebook.get);
route.post('/:classId/gradebooks', [ authenticate ], gradebook.post);
route.put('/:classId/gradebooks', [ authenticate ], gradebook.put);
route.delete('/:classId/gradebooks', [ authenticate ], gradebook.remove);

export { route as classes };
