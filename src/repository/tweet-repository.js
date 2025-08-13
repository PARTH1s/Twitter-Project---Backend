import Tweet from '../models/tweet.js';
import CrudRepository from './crud-repository.js';

/**
 * Repository for handling Tweet-related database operations.
 * Inherits basic CRUD operations from CrudRepository.
 */
class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  /**
   * Get all tweets with pagination and latest-first sorting.
   * @param {number} offset - Number of documents to skip.
   * @param {number} limit - Number of documents to return.
   * @returns {Promise<Array>}
   */
  async getAll(offset = 0, limit = 10) {
    try {
      return await Tweet.find()
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error in TweetRepository.getAll:', error);
      throw error;
    }
  }

  /**
   * Create a new tweet.
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    try {
      return await Tweet.create(data);
    } catch (error) {
      console.error('Error in TweetRepository.create:', error);
      throw error;
    }
  }

  /**
   * Get a tweet along with its comments (nested population).
   * @param {string} id - Tweet ID
   * @returns {Promise<Object>}
   */
  async getWithComments(id) {
    try {
      return await Tweet.findById(id)
        .populate({ path: 'comments', populate: { path: 'comments' } })
        .lean();
    } catch (error) {
      console.error('Error in TweetRepository.getWithComments:', error);
      throw error;
    }
  }

  /**
   * Find a tweet and populate its likes.
   * @param {string} id - Tweet ID
   * @returns {Promise<Object>}
   */
  async find(id) {
    try {
      return await Tweet.findById(id).populate({ path: 'likes' });
    } catch (error) {
      console.error('Error in TweetRepository.find:', error);
      throw error;
    }
  }
}

export default TweetRepository;
