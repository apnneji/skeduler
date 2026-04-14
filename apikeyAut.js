require('dotenv').config();

const checkApiKey = (req, res, next) => {
const apiKey = req.headers['x-api-key'];

    // Check if the API key is present and correct
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
    }

    // If the key is valid, proceed to the next middleware or route handler
    next();
};

module.exports = { checkApiKey };