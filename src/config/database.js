import mongoose from 'mongoose';

// Connects to MongoDB using Mongoose
export const connect = async () => {
    await mongoose.connect('mongodb://localhost/twitter_dev');
};
