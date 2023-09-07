// route.js
const httpStatus = require('http-status');
const { app, client } = require('./app');
const { ObjectId } = require('mongodb');

// Define MongoDB collections
const db = client.db('sea-tek');
const productCollection = db.collection('products');
const userCollection = db.collection('user');

// get all products
app.get('/products', async (req, res) => {
    const cursor = productCollection.find({});
    const product = await cursor.toArray();

    res.send({ status: true, data: product });
});

// Add a new product
app.post('/product', async (req, res) => {
    const product = req.body;
    const result = await productCollection.insertOne(product);

    res.send(result);
});

// Get a product by ID
app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const result = await productCollection.findOne({ _id: ObjectId(id) });

    if (result) {
        res.send(result);
    } else {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Product not found' });
    }
});

// Delete a product by ID
app.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    const result = await productCollection.deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount === 1) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Product not found' });
    }
});

// Add a comment to a product
app.post('/comment/:id', async (req, res) => {
    const productId = req.params.id;
    const comment = req.body.comment;

    const result = await productCollection.updateOne(
        { _id: ObjectId(productId) },
        { $push: { comments: comment } }
    );

    if (result.modifiedCount !== 1) {
        console.error('Product not found or comment not added');
        res.status(httpStatus.NOT_FOUND).json({ error: 'Product not found or comment not added' });
        return;
    }

    console.log('Comment added successfully');
    res.json({ message: 'Comment added successfully' });
});

// Get comments for a product by ID
app.get('/comment/:id', async (req, res) => {
    const productId = req.params.id;

    const result = await productCollection.findOne(
        { _id: ObjectId(productId) },
        { projection: { _id: 0, comments: 1 } }
    );

    if (result) {
        res.json(result);
    } else {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Product not found' });
    }
});

// Add a new user
app.post('/user', async (req, res) => {
    const user = req.body;
    const result = await userCollection.insertOne(user);

    res.send(result);
});

// Get a user by email
app.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    const result = await userCollection.findOne({ email });

    if (result?.email) {
        return res.send({ status: true, data: result });
    }

    res.send({ status: false });
});

// Export the app for use in server.js
module.exports = app;
