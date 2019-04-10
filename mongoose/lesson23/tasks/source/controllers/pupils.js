import { Pupils as PupilsModel } from '../models';

export class Pupils {
    constructor(data) {
        this.models = {
            pupils: new PupilsModel(data),
        };
    }

    async find() {
        const data = await this.models.pupils.find();

        return data;
    }

    async create() {
        const data = await this.models.pupils.create();

        return data;
    }
}
