import express from 'express';
import { connect } from './config/database.js';
const app = express();

const PORT = 3000;

import service from './services/tweet-service.js';

// Start server
app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`);
    await connect();
    console.log('Database Connected!');

    let ser= new service();
    await ser.create({content: 'To be #work'})
});