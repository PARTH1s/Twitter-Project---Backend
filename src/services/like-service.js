import { LikeRepository, TweetRepository } from '../repository/index.js';

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
    if (!modelType) throw new Error("modelType is required");

    const normalizedType = modelType.trim().toLowerCase();

    let likeable;
    if (normalizedType === 'tweet') {
        likeable = await this.tweetRepository.getById(modelId);
    } else if (normalizedType === 'comment') {
        // TODO: implement comment repo logic
    } else {
        throw new Error('Unknown Model Type');
    }

    if (!likeable) throw new Error(`${modelType} not found`);

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
