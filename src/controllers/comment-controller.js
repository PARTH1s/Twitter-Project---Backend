import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
    try {
        const { modelId, modelType } = req.query;
        const { userId, content } = req.body;

        const response = await commentService.create(
            modelId,
            modelType,
            userId,
            content
        );
        return res.status(201).json({
            success: true,
            message: "Successfully created a new comment",
            data: response,
            err: {},
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong!",
            data: {},
            err: error,
        });
    }
};
