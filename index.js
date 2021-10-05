const express = require('express');

// create server
const app = express();

// PORT app
const PORT = process.env.PORT || 5000;

// server started
app.listen(PORT, () => console.log(`Server has started at port: ${PORT} `));
