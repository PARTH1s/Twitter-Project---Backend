import { LikeRepository, TweetRepository } from '../repository/index.js';

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        let likeable;
        if (modelType === 'Tweet') {
            likeable = await this.tweetRepository.getById(modelId);  
        } else if (modelType === 'Comment') {
            // TODO: implement comment repo logic
        } else {
            throw new Error('Unknown Model Type');
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if (exists) {
            likeable.likes.pull(exists._id);
            await likeable.save();
            await this.likeRepository.destroy(exists._id);
            return false;  
        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            likeable.likes.push(newLike._id);
            await likeable.save();
            return true;  
        }
    }
}

export default LikeService;
