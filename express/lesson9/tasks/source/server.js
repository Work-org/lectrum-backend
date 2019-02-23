// Core
import express from 'express';

// Instruments
import { classesRouter, subjectRouter } from './routes';

const app = express();

app.use('/classes', classesRouter);
app.use('/subject', subjectRouter);

export { app };
