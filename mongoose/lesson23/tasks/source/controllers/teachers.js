import { Teachers as TeachersModel } from '../models';

export class Teachers {
    constructor(data) {
        this.models = {
            teachers: new TeachersModel(data),
        };
    }

    async find() {
        const data = await this.models.teachers.find();

        return data;
    }

    async create() {
        const data = await this.models.teachers.create();

        return data;
    }
}
