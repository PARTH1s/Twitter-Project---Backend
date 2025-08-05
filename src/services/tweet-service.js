import { TweetRepository, HashtagRepository } from '../repository/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;

        // Extract hashtags (remove #)
        let tags = content.match(/#[a-zA-Z0-9_]+/g) || [];
        tags = tags.map(tag => tag.substring(1).toLowerCase());

        // Save tweet
        const tweet = await this.tweetRepository.create(data);

        // Find already present hashtags
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags = alreadyPresentTags.map(tag => tag.title.toLowerCase());

        // Filter only new hashtags
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));

        // Prepare hashtag objects for bulk create
        newTags = newTags.map(tag => ({ title: tag, tweets: [tweet._id] }));

        console.log("newTags.length ", newTags.length)
        // Bulk insert new hashtags
        if (newTags.length > 0) {
            await this.hashtagRepository.bulkCreate(newTags);
            alreadyPresentTags.forEach((tag) => {
                tag.tweet.push(tweet.id);
                tag.save();
            })
        }

        return tweet;
    }

    async get(tweetId) {
        try {
            const tweet = await this.tweetRepository.getWithComments(tweetId);
            return tweet;
        } catch (error) {
            throw error;
        }
    }

}

export default TweetService;
