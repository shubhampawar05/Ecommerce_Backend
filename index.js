const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());


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
  app.get('/api/v1/data/:categoryName', async (req, res) => {
    try {
      const { categoryName } = req.params;
      // console.log(categoryName);
      const items = await mongoose.connection.db.collection('Ecommerce-products').find({ category: categoryName }).toArray();
      if (!items) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(items);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving items', error });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});