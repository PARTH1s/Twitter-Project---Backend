import Like from '../models/like.js';
import CrudRepository from './crud-repository.js';

/**
 * Repository for handling Like-related database operations.
 * Inherits basic CRUD operations from CrudRepository.
 */
class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }

  /**
   * Find a like by user and the target likeable entity (tweet, comment, etc.).
   * @param {Object} data - Query object containing userId and likeable reference.
   * @returns {Promise<Object|null>}
   */
  async findByUserAndLikeable(data) {
    try {
      return await Like.findOne(data);
    } catch (error) {
      console.error('Error in LikeRepository.findByUserAndLikeable:', error);
      throw error;
    }
  }
}

export default LikeRepository;
