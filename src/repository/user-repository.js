import User from '../models/user.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }
    async findBy(data) {
        try {
            const res = await User.findOne(data);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;
