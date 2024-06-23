import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';  
const app = express();

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security middleware
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Route handlers
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

// API routes
app.use('/', userRoutes);
app.use('/', productRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized' });
  } else if (err.name === 'BadRequestError') {
    res.status(400).json({ error: 'Bad Request' });
  } else {
    next(err);
  }
});

// Catch-all route for handling 404 errors
app.use((req, res) => {
  res.status(404).send('Resource not found');
});

export default app;
