import { UserRepository } from '../repository/index.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        const user = await this.userRepository.create(data);
        return user;
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signin(email, password) {
        try {
            const user = await this.getUserByEmail(email);

            if (!user) {
                throw new Error('User not found');
            }
 
            const isMatch = user.comparePassword(password);

            if (!isMatch) {
                throw new Error('Incorrect password');
            }

            const token = user.genJWT();

            return { user, token };

        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
