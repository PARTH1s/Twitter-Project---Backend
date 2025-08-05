import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(modelId, modelType, userId, content) {
        if (!modelId) throw new Error("modelId is required");
        if (!modelType) throw new Error("modelType is required");
        if (!userId) throw new Error("userId is required");
        if (!content) throw new Error("content is required");

        const normalizedType = modelType.trim().toLowerCase();
        let commentable;

        // Fetch commentable entity based on type
        switch (normalizedType) {
            case "tweet":
                commentable = await this.tweetRepository.find(modelId);
                break;
            case "comment":
                commentable = await this.commentRepository.find(modelId);
                break;
            default:
                throw new Error("Unknown Model Type: " + modelType);
        }

        if (!commentable) {
            throw new Error(`No ${normalizedType} found with id ${modelId}`);
        }

        // Ensure commentable has comments array
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

        // Add reference of new comment to commentable
        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }
}

export default CommentService;
