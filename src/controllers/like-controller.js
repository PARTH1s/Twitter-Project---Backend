import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try {
        console.log("REQ QUERY:", req.query);
        console.log("REQ BODY:", req.body);

        const { modelId, modelType } = req.query;
        const { userId } = req.body;

        const response = await likeService.toggleLike(modelId, modelType, userId);

        return res.status(201).json({
            success: true,
            message: "Successfully toggled a like!",
            data: response,
            err: {}
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: error.message
        });
    }
};

