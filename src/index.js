import express from 'express';
import { connect } from './config/database.js';
const app = express();

const PORT = 3000;


// Start server
app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`);
    await connect();
    console.log('Database Connected!');
});