const Hashtag = require('../models/hashtags');

class HashtagRepository {
    async getAll(offset = 0, limit = 10) {
        try {
            const Hashtags = await Hashtag.find()
                .skip(offset)
                .limit(limit)
                .sort({ createdAt: -1 });
            return Hashtags;
        } catch (error) {
            console.error('Error in getAll:', error);
            throw error;
        }
    }

    async create(data) {
        try {
            const Hashtag = await Hashtag.create(data);
            return Hashtag;
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    }

    async bulkCreate(dataArray) {
        try {
            const hashtags = await Hashtag.insertMany(dataArray);
            return hashtags;
        } catch (error) {
            console.error('Error in bulkCreate:', error);
            throw error;
        }
    }

    async destroy(id) {
        try {
            const deletedHashtag = await Hashtag.findByIdAndDelete(id);
            return deletedHashtag;
        } catch (error) {
            console.error('Error in destroy:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const Hashtag = await Hashtag.findById(id);
            return Hashtag;
        } catch (error) {
            console.error('Error in getById:', error);
            throw error;
        }
    }

    async findByName(titleList) {
        try {
            const hashtags = await Hashtag.find({
                title:titleList
            }).select('title -_id');
            return hashtags;
        } catch (error) {
            console.error('Error in findByName:', error);
            throw error;
        }
    }
}

module.exports = HashtagRepository;
