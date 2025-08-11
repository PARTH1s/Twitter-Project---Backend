import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { connect } from './config/database.js';
import {  passportAuth   } from './middlewares/jwt-midleware.js';

import apiroutes from './routes/index.js';

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiroutes);
// Start server
app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`);
    await connect();
    console.log('Database Connected!');



});