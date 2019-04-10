import v4 from 'uuid/v4';

// ODM
import { pupils } from '../odm';

export class Pupils {
    constructor(data) {
        this.data = data;
    }

    async find() {
        const data = await pupils.find().lean();

        return data;
    }

    async create() {
        const pupil = {
            hash: v4(),
            ...this.data,
        };
        const data = await pupils.create(pupil);

        return data;
    }
}
