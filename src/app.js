// app.js
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

// MongoDB connection setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbdbuji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

// Export the app and client for use in other modules
module.exports = { app, client };
