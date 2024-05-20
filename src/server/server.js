// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://akosta02:GmQ6dDwPJw61cTwi@diplom.v5gpahf.mongodb.net/?retryWrites=true&w=majority&appName=diplom')
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Database connection error:', err));

const reviewSchema = new mongoose.Schema({
  placeId: String,
  placeName: String,
  placeAddress: String,
  user: String,
  comment: String,
  rating: Number,
  date: { type: Date, default: Date.now },
});
  
const Review = mongoose.model('Review', reviewSchema);
  
app.post('/reviews', async (req, res) => {
  try {
    const { placeId, placeName, placeAddress, user, comment, rating } = req.body;
    const review = new Review({ placeId, placeName, placeAddress, user, comment, rating });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Failed to save review:', err);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

app.get('/reviews/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await Review.find({ placeId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
