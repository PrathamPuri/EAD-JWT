require('dotenv').config(); // Load .env variables
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();



app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return res.status(401).send('Token missing');
  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) return res.status(403).send('Invalid token');
    next();
  });
};

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.send('Protected content accessed!');
});

// Start the server on port 3001
app.listen(3001, () => console.log('Server B (protected) running on port 3001'));
