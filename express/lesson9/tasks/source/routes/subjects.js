// Core
import express from 'express';
import dg from 'debug';

// Instruments
import { seasonsRouter } from './subjects/season';

const router = express.Router();
const debug = dg('router:subject');

router.param('subjectId', function(req, res, next, subjectId) {
    req.parentsParam = {
        subjectId
    };
    
    return next();
});

router.route('/')
      .get((req, res) => {
          try {
              res.status(200).json({ data: [] });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post((req, res) => {
          res.status(405).json({ message: 'not implement yet' });
      });

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
      .post((req, res) => {
          res.status(405).json({ message: 'not implement yet' });
      });

router.use('/:subjectId/seasons', seasonsRouter);

export { router as subjectRouter }