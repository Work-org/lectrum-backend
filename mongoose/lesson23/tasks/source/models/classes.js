import v4 from 'uuid/v4';

// ODM
import { classes } from '../odm';

export class Classes {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const userClass = {
            hash: v4(),
            ...this.data,
        };
        const data = await classes.create(userClass);

        return data;
    }

    async find() {
        const data = await classes.find().lean();

        return data;
    }

    async findById() {
        const { id } = this.data;
        const data = await classes
            .findById(id)
            .populate({ path: 'gradebooks.gradebook', select: '-_id -__v' })
            .select('-_id -__v')
            .lean();

        return data;
    }

    async assignGradebook() {
        const { id, gradebook } = this.data;
        const data = await classes.findByIdAndUpdate(
            id,
            {
                $addToSet: { gradebooks: { gradebook } },
            },
            { new: true },
        );

        return data;
    }
}
