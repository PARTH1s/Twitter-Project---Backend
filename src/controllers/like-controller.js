import LikeService from "../services/like-service.js";

const likeService = new LikeService();

/**
 * Toggles like/unlike status for a given model by a user.
 * Validates required query params and body fields.
 */
export const toggleLike = async (req, res) => {
    try {
        const { modelId, modelType } = req.query;
        const { userId } = req.body;

        // Validate inputs
        if (!modelId || !modelType) {
            return res.status(400).json({
                success: false,
                message: "Missing required query parameters: modelId or modelType",
                data: {},
                err: {},
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required field in request body: userId",
                data: {},
                err: {},
            });
        }

        const result = await likeService.toggleLike(modelId, modelType, userId);

        return res.status(200).json({
            success: true,
            message: "Successfully toggled a like!",
            data: result,
            err: {},
        });

    } catch (error) {
        console.error("Error toggling like:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: error.message || error,
        });
    }
};
