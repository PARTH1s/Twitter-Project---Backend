import Hashtag from '../models/hashtags.js';

/**
 * Repository for handling Hashtag CRUD operations.
 */
class HashtagRepository {
  /**
   * Get all hashtags with pagination and sorting.
   * @param {number} offset - Number of documents to skip.
   * @param {number} limit - Number of documents to return.
   * @returns {Promise<Array>}
   */
  async getAll(offset = 0, limit = 10) {
    try {
      return await Hashtag.find()
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error in HashtagRepository.getAll:', error);
      throw error;
    }
  }

  /**
   * Create a single hashtag.
   * @param {Object} data - Hashtag data.
   * @returns {Promise<Object>}
   */
  async create(data) {
    try {
      return await Hashtag.create(data);
    } catch (error) {
      console.error('Error in HashtagRepository.create:', error);
      throw error;
    }
  }

  /**
   * Bulk create multiple hashtags.
   * @param {Array<Object>} dataArray
   * @returns {Promise<Array>}
   */
  async bulkCreate(dataArray) {
    try {
      return await Hashtag.insertMany(dataArray);
    } catch (error) {
      console.error('Error in HashtagRepository.bulkCreate:', error);
      throw error;
    }
  }

  /**
   * Delete a hashtag by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async destroy(id) {
    try {
      return await Hashtag.findByIdAndDelete(id);
    } catch (error) {
      console.error('Error in HashtagRepository.destroy:', error);
      throw error;
    }
  }

  /**
   * Get a hashtag by ID.
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    try {
      return await Hashtag.findById(id);
    } catch (error) {
      console.error('Error in HashtagRepository.getById:', error);
      throw error;
    }
  }

  /**
   * Find hashtags by their title(s).
   * @param {Array<string>} titleList
   * @returns {Promise<Array>}
   */
  async findByName(titleList) {
    try {
      return await Hashtag.find({ title: { $in: titleList } }).select('title -_id');
    } catch (error) {
      console.error('Error in HashtagRepository.findByName:', error);
      throw error;
    }
  }
}

export default HashtagRepository;
