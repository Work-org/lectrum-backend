import v4 from 'uuid/v4';

// ODM
import { gradebooks } from '../odm';

export class Gradebooks {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const gradebook = {
            hash: v4(),
            ...this.data,
        };
        const data = await gradebooks.create(gradebook);

        return data;
    }

    async find() {
        const data = await gradebooks.find().lean();

        return data;
    }
}
