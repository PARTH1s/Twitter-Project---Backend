import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './config/database.js';
import apiroutes from './routes/index.js'
// import { TweetRepository, UserRepository } from './repository/index.js';
// import LikeService from './services/like-service.js';
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiroutes);
// Start server
app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`);
    await connect();
    console.log('Database Connected!');

    // const userRepo = new UserRepository();
    // const tweetRepo = new TweetRepository();
    // const tweets = await tweetRepo.getAll(0, 10); 
    // const user = await userRepo.create({
    //     email: 'parthsahni@gmail.com',
    //     password: '123456',
    //     name: 'Parth sahni'
    // });
    // console.log("user", user);

    // const likeService = new LikeService();
    // const isLiked = await likeService.toggleLike(tweets[0]._id, 'Tweet', user._id);
    // console.log('Is liked added?', isLiked);

});