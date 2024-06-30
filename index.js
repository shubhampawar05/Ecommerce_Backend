const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Define the GET endpoint to retrieve all data
app.get('/api/v1/data', async (req, res) => {
    try {
        console.log(req.path);
      const allData = await mongoose.connection.db.collection('Ecommerce-products').find({}).toArray();
      res.json(allData);
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});