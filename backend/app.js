const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

// Create Sequelize instance and connect to MySQL database
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define Chat model for storing chat messages
const Chat = sequelize.define('Chat', {
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchronize the model with the database (create the table if it doesn't exist)
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
  const apiUrl = "https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation"; // Replace with your API endpoint

// Endpoint to save chat messages
app.post(apiUrl, async (req, res) => {
  const { message } = req.body;
  try {
    // Save message to database
    const savedMessage = await Chat.create({ message });
    res.json({ message: 'Chat saved successfully' });
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
