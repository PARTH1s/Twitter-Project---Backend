import Tweet from '../models/tweet.js';
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    async getAll(offset = 0, limit = 10) {
        try {
            const tweets = await Tweet.find()
                .skip(offset)
                .limit(limit)
                .sort({ createdAt: -1 });
            return tweets;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    }

    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    }

    // async destroy(id) {
    //     try {
    //         const deletedTweet = await Tweet.findByIdAndDelete(id);
    //         return deletedTweet;
    //     } catch (error) {
    //         console.error('Error in destroy:', error);
    //         throw error;
    //     }
    // }

    // async getById(id) {
    //     try {
    //         const tweet = await Tweet.findById(id);
    //         return tweet;
    //     } catch (error) {
    //         console.error('Error in getById:', error);
    //         throw error;
    //     }
    // }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({ path: 'comments' }).lean();
            return tweet;
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    }
}

export default TweetRepository;
