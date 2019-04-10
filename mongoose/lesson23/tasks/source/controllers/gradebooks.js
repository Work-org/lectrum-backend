import { Gradebooks as GradebooksModel } from '../models';

export class Gradebooks {
    constructor(data) {
        this.models = {
            gradebooks: new GradebooksModel(data),
        };
    }

    async create() {
        const data = await this.models.gradebooks.create();

        return data;
    }

    async find() {
        const data = await this.models.gradebooks.find();

        return data;
    }
}
