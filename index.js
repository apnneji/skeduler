
const express = require('express');
const cors = require('cors');
const getSkedvisitRouter = require('./routes/getSkedvisit');
//const adjustmentRouter = require('./routes/adjustment');
const { pool, schema, checkDatabaseConnection } = require("./db"); // import the function
const { checkApiKey } = require("./apikeyAut"); // import the middleware


// 2. Initialize the Express application
const app = express();
const port = process.env.PORT || 3000;

// Define an array of allowed origins
const allowedOrigins = ['https://nregstudent.onrender.com', 'http://localhost:3000','https://eschoolmgmt.vercel.app'];

// Middleware to check for the API key

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// 6. Start the server only if the database connection is successful
checkDatabaseConnection().then(isSuccessful => {
    if (isSuccessful) {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } else {
        console.error('Server not started due to database connection error.');
    }
});

app.use('/api/skedvisit',getSkedvisitRouter);