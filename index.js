const express = require('express');
const connectDB = require('./config/db');

// create server
const app = express();

// connected to database
connectDB();

// enable express.json bodyparser
app.use(express.json({ extended: true }));

// PORT app
const PORT = process.env.PORT || 5000;

// define routes
app.use('/api/users', require('./routes/users.js'));
app.use('/api/auth', require('./routes/auth.js'));

// server started
app.listen(PORT, () => console.log(`Server has started at port: ${PORT} `));
