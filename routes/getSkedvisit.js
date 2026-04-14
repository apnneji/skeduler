const express = require('express');
const router = express.Router();

// Database connection pool and schema
const { pool, schema } = require('../db');
// API key middleware
const { checkApiKey } = require('../apikeyAut');

// GET /skedvisit - Retrieve all records from skeduler.skedvisit
router.get('/', checkApiKey, async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${schema}.skedvisit`);
    // Return rows in JSON format
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/saveskedvisit', checkApiKey, async (req, res) => {
  try {
    const { name, visitdate, visittime, idnumber } = req.body;
    const result = await pool.query(
      `call  ${schema}.insert_skedvisit($1, $2, $3, $4)`,
      [name, visitdate, visittime, idnumber]
    );
    res.status(201).json({ message: 'Save Skedvisit saved successfully.'});
  } catch (err) {
    console.error('Database insert error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
