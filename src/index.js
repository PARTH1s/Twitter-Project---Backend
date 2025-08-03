const express = require('express');
const connect = require('./config/database');
const app = express();

const PORT = 3000;


// Start server
app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`);
    await connect();
    console.log('Database Connected!');
});