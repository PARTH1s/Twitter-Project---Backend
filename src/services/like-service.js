import { LikeRepository, TweetRepository } from '../repository/index.js';

/**
 * Service layer for handling likes on tweets or comments.
 */
class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    // TODO: Add CommentRepository when comment like logic is implemented
  }

  /**
   * Toggle a like for a given model (tweet or comment) by a user.
   * @param {string} modelId - ID of the entity to like/unlike.
   * @param {string} modelType - Type of the entity ("tweet" or "comment").
   * @param {string} userId - ID of the user performing the action.
   * @returns {Promise<boolean>} - True if liked, false if unliked.
   */
  async toggleLike(modelId, modelType, userId) {
    if (!modelType) throw new Error("modelType is required");

    const normalizedType = modelType.trim().toLowerCase();

    let likeable;

    // Fetch the entity to be liked/unliked
    if (normalizedType === 'tweet') {
      likeable = await this.tweetRepository.find(modelId);
    } else if (normalizedType === 'comment') {
      // TODO: Implement comment repository logic
    } else {
      throw new Error(`Unknown model type: ${modelType}`);
    }

    if (!likeable) throw new Error(`${modelType} not found`);

    // Check if the user has already liked the entity
    const existingLike = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId
    });

    if (existingLike) {
      // Remove existing like
      likeable.likes.pull(existingLike._id);
      await likeable.save();
      await this.likeRepository.destroy(existingLike._id);
      return false; // Indicates unlike
    } else {
      // Create new like
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId
      });
      likeable.likes.push(newLike._id);
      await likeable.save();
      return true; // Indicates like
    }
  }
}

export default LikeService;
