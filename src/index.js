import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { connect } from './config/database.js';
import { passportAuth } from './middlewares/jwt-midleware.js';
import apiRoutes from './routes/index.js';

const PORT = 3000;
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Passport for JWT authentication
app.use(passport.initialize());
passportAuth(passport);

// Register API routes
app.use('/api', apiRoutes);

// Start the server and connect to database
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  try {
    await connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit process if DB connection fails
  }
});
