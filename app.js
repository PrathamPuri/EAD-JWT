require('dotenv').config(); // Load .env variables
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Mock user data
const user = { id: 1, username: 'john', password: '123' };

// Login route to generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).send('Invalid credentials');
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server A (auth) running on port 3000'));
