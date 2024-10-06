const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reportsRoutes = require('./routes/reports');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Use the reports API routes
app.use(reportsRoutes);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
