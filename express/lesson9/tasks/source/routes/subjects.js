// Core
import express from 'express';
import dg from 'debug';

// Instruments
import { seasonsRouter } from './subjects/season';

const router = express.Router();
const debug = dg('router:subject');

router.route('/')
      .get((req, res) => {
          // debug(req.params);
          try {
              res.status(200).json({ data: [] });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post();

router.route('/:subjectId')
      .get((req, res) => {
          debug(req.params);
          try {
              res.status(200).json({ data: [] });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post();

router.use('/:subjectId/seasons', seasonsRouter);

export { router as subjectRouter }