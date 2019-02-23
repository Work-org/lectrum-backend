// Core
import express from 'express';
import dg from 'debug';

const router = express.Router();
const debug = dg('router:seasons');

router.route('/:seasonsId')
      .get((req, res) => {
          // @todo how get parent params?
          debug(req.params);
          try {
              res.status(200).json({ data: ['season1', 'season2'] });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post();

export { router as seasonsRouter }