import { CommentRepository, TweetRepository } from "../repository/index.js";

/**
 * Service layer for handling comment-related business logic.
 */
class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  /**
   * Create a comment on a tweet or another comment.
   * @param {string} modelId - ID of the entity being commented on.
   * @param {string} modelType - Type of the entity ("tweet" or "comment").
   * @param {string} userId - ID of the user creating the comment.
   * @param {string} content - Comment content.
   * @returns {Promise<Object>} - The created comment.
   */
  async create(modelId, modelType, userId, content) {
    if (!modelId) throw new Error("modelId is required");
    if (!modelType) throw new Error("modelType is required");
    if (!userId) throw new Error("userId is required");
    if (!content) throw new Error("content is required");

    const normalizedType = modelType.trim().toLowerCase();
    let commentable;

    // Fetch the commentable entity based on type
    switch (normalizedType) {
      case "tweet":
        commentable = await this.tweetRepository.find(modelId);
        break;
      case "comment":
        commentable = await this.commentRepository.find(modelId);
        break;
      default:
        throw new Error(`Unknown model type: ${modelType}`);
    }

    if (!commentable) {
      throw new Error(`No ${normalizedType} found with id ${modelId}`);
    }

    // Ensure the commentable has a comments array
    if (!Array.isArray(commentable.comments)) {
      commentable.comments = [];
    }

    // Create new comment
    const comment = await this.commentRepository.create({
      content,
      userId,
      onModel: modelType,
      commentable: modelId,
      comments: [],
    });

    // Add reference of new comment to the commentable
    commentable.comments.push(comment);
    await commentable.save();

    return comment;
  }
}

export default CommentService;
