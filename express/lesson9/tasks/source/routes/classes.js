// Core
import express from 'express';
import dg from 'debug';

const router = express.Router();
const debug = dg('router:classes');

const classes = [
    { id: 1, gradebook: ['1', '2'] },
    { id: 2, gradebook: [] }
];

router.route('/')
      .get((req, res) => {
          try {
              res.status(200).json({ classes });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post((req, res) => {
          try {
              res.status(200).json({ classes });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      });

router.route('/:classId')
      .get((req, res) => {
          try {
              const clase = classes.find(clase => clase.id === parseInt(req.params.classId, 10));
        
              if (!clase) {
                  return res.status(400).json({ message: error.message });
              }
        
              res
                  .status(200)
                  .json({ class: clas });
          } catch (error) {
              res.status(404).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post((req, res) => {
          try {
              res.status(200).json({ class: classes[0] });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .put((req, res) => {
          try {
              res.status(200).json({ class: classes[0] });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .delete((req, res) => {
          try {
              res.sendStatus(204);
          } catch (error) {
              res.status(400).json({ message: error.message });
          }
      });

router.route('/:classId/gradebook')
      .get((req, res) => {
          try {
              const clase = classes.find(clase => clase.id === parseInt(req.params.classId, 10));
        
              if (!clase) {
                  return res.status(400).json({ message: error.message });
              }
        
              res
                  .status(200)
                  .json({ gradebook: clase.gradebook });
          } catch (error) {
              res.status(404).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .post((req, res) => {
          try {
              res.status(200).json({ class: classes[0].gradebox });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .put((req, res) => {
          try {
              res.status(200).json({ class: classes[0].gradebox });
          } catch (error) {
              res.status(400).json({ message: error.message });
              debug(error.message, error.stack);
          }
      })
      .delete((req, res) => {
          try {
              res.sendStatus(204);
          } catch (error) {
              res.status(400).json({ message: error.message });
          }
      });

export { router as classesRouter }