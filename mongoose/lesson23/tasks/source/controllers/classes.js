import { Classes as ClassesModel } from '../models';

export class Classes {
    constructor(data) {
        this.models = {
            classes: new ClassesModel(data),
        };
    }

    async create() {
        const data = await this.models.classes.create();

        return data;
    }

    async find() {
        const data = await this.models.classes.find();

        return data;
    }

    async findById() {
        const data = await this.models.classes.findById();

        return data;
    }

    async assignGradebook() {
        const data = await this.models.classes.assignGradebook();

        return data;
    }
}
