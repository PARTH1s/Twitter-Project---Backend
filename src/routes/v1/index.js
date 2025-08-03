import express from 'express';

import { createTweet } from '../../controllers/tweet-controller.js';

const router = express.router();

router.post('/tweets', createTweet);

export default router;