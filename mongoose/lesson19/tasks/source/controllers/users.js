import { Users as UsersModel } from '../models';

export class Users {
    constructor(data) {
        this.models = {
            users: new UsersModel(data),
        };
    }

    async register() {
        // this.models.users.validate();
        const data = await this.models.users.register();

        return data;
    }
}
