import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './config/database.js';
import apiroutes from './routes/index.js'
import service from './services/tweet-service.js';

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('./api', apiroutes);
// Start server
app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`);
    await connect();
    console.log('Database Connected!');

    let ser = new service();
    await ser.create({ content: 'To be #work' })
});