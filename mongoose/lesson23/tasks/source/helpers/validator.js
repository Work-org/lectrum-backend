// Core
import Ajv from 'ajv';

// Instruments
import { ValidationError } from './';
import * as models from '../models';

export const validatorSchema = (schema) => (req, res, next) => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
        next();
    } else {
        const errors = validate.errors.map(({ message }) => message).join(', ');
        const body = JSON.stringify(req.body, null, 2);

        next(new ValidationError(`${req.method}: ${req.originalUrl} [ ${errors} ]\n${body}`, 400));
    }
};

export const validatorPath = (keyObjectId, modelName = null) => async (value) => {

    // [ {keyObjectId: ObjectId} ]
    // ObjectId
    if (!Object.keys(models).includes(modelName || keyObjectId)) {
        throw new Error('model name incorrect');
    }

    const listCheckObject = value;

    if (!Array.isArray(value)) {
        listCheckObject.push({[ keyObjectId ]: value});
    }

    for (const ref of listCheckObject) {
        const [[ /*refModelName*/, refObjectId ]] = Object.entries(ref);
        if (await !models[ modelName || keyObjectId ].findOne({ _id: refObjectId })) {
            return false;
        }
    }

    return true;
};
