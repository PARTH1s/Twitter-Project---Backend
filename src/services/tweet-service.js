import { TweetRepository, HashtagRepository } from '../repository/index.js';

/**
 * Service layer for handling tweet-related business logic.
 */
class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  /**
   * Create a tweet and handle hashtags.
   * @param {Object} data - Tweet data including content and userId.
   * @returns {Promise<Object>} - The created tweet.
   */
  async create(data) {
    const content = data.content;

    // Extract hashtags (remove '#' and normalize to lowercase)
    let tags = content.match(/#[a-zA-Z0-9_]+/g) || [];
    tags = tags.map(tag => tag.substring(1).toLowerCase());

    // Save the tweet
    const tweet = await this.tweetRepository.create(data);

    // Fetch already existing hashtags
    const alreadyPresentTags = await this.hashtagRepository.findByName(tags);
    const titleOfPresentTags = alreadyPresentTags.map(tag => tag.title.toLowerCase());

    // Filter only new hashtags
    let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));

    // Prepare new hashtag objects for bulk creation
    newTags = newTags.map(tag => ({ title: tag, tweets: [tweet._id] }));

    // Bulk insert new hashtags and update existing hashtags
    if (newTags.length > 0) {
      await this.hashtagRepository.bulkCreate(newTags);
    }

    // Update existing hashtags to include this tweet
    for (const tag of alreadyPresentTags) {
      if (!tag.tweets.includes(tweet._id)) {
        tag.tweets.push(tweet._id);
        await tag.save();
      }
    }

    return tweet;
  }

  /**
   * Fetch a tweet by ID with its comments populated.
   * @param {string} tweetId - ID of the tweet.
   * @returns {Promise<Object>} - The tweet with comments.
   */
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
