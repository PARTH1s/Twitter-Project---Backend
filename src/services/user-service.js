import { UserRepository } from '../repository/index.js';

/**
 * Service layer for handling user-related operations
 */
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Sign up a new user
   * @param {Object} data - User data (name, email, password, etc.)
   * @returns {Promise<Object>} - Created user
   */
  async signup(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  }

  /**
   * Get a user by email
   * @param {string} email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  /**
   * Sign in a user with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} - Object containing user and JWT token
   */
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
      console.error('Error during signin:', error);
      throw error;
    }
  }
}

export default UserService;
