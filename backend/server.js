import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './router.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'DELETE'],       // Allowed methods
  credentials: true               // Include credentials if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/farm_to_table', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(router);

app.listen(3002, () => {
  console.log('Listening to port 3002');
});