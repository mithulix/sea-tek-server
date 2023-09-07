// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const routes = require('./routes');

// Use routes
app.use('/', routes);


app.listen(port, () => {
  console.log(`🐳 Server is running on port: ${port}`);});
