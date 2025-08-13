import User from '../models/user.js';
import CrudRepository from './crud-repository.js';

/**
 * Repository for handling User-related database operations.
 * Inherits basic CRUD operations from CrudRepository.
 */
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  /**
   * Find a single user by given query criteria.
   * @param {Object} data - Query object (e.g., { email: 'example@mail.com' }).
   * @returns {Promise<Object|null>}
   */
  async findBy(data) {
    try {
      return await User.findOne(data);
    } catch (error) {
      console.error('Error in UserRepository.findBy:', error);
      throw error;
    }
  }
}

export default UserRepository;
