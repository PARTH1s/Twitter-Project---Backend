import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService();

/**
 * Creates a new tweet with data from request body.
 * Validates required fields before calling service.
 */
export const createTweet = async (req, res) => {
    try {
        const { content, userId } = req.body;

        if (!content || !userId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: content or userId",
                data: {},
                err: {},
            });
        }

        const tweet = await tweetService.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Successfully created a new tweet",
            data: tweet,
            err: {},
        });
    } catch (error) {
        console.error("Error creating tweet:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: error.message || error,
        });
    }
};

/**
 * Fetches a tweet by ID from request params.
 */
export const getTweet = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing tweet ID",
                data: {},
                err: {},
            });
        }

        const tweet = await tweetService.get(id);

        if (!tweet) {
            return res.status(404).json({
                success: false,
                message: "Tweet not found",
                data: {},
                err: {},
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the tweet",
            data: tweet,
            err: {},
        });
    } catch (error) {
        console.error("Error fetching tweet:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: error.message || error,
        });
    }
};
