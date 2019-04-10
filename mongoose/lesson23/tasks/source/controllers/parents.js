import { Parents as ParentsModel } from '../models';

export class Parents {
    constructor(data) {
        this.models = {
            parents: new ParentsModel(data),
        };
    }

    async findAllPupils() {
        const data = await this.models.parents.findAllPupils();

        return data;
    }

    async createPupils() {
        const data = await this.models.parents.createPupils();

        return data;
    }
}
