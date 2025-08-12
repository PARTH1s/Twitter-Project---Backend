import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

/**
 * Creates a new comment for a specified model (e.g., post, article).
 * Validates required inputs before calling the service.
 */
export const createComment = async (req, res) => {
    try {
        const { modelId, modelType } = req.query;
        const { userId, content } = req.body;

        // Basic validation
        if (!modelId || !modelType) {
            return res.status(400).json({
                success: false,
                message: "Missing required query parameters: modelId or modelType",
                data: {},
                err: {},
            });
        }

        if (!userId || !content) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields in request body: userId or content",
                data: {},
                err: {},
            });
        }

        const comment = await commentService.create(modelId, modelType, userId, content);

        return res.status(201).json({
            success: true,
            message: "Successfully created a new comment",
            data: comment,
            err: {},
        });

    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            data: {},
            err: error.message || error,
        });
    }
};
