// run as node server.js in new cmd terminal 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  address: String,
  age: Number,
  location: String,
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/submit', async (req, res) => {
  const userData = new User(req.body);
  try {
    await userData.save();
    res.status(201).send('User data saved successfully');
  } catch (error) {
    res.status(400).send('Error saving user data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
