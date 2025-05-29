const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const xml2js = require('xml2js');
const serialize = require('node-serialize');

const app = express();

// Hardcoded database credentials
const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'vulnapp'
};

// Hardcoded JWT secret
const JWT_SECRET = 'super_secret_key_12345';

// AWS credentials hardcoded
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

app.use(express.json());

// Disable security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('X-Powered-By', 'Express 4.16.4');
  next();
});

const db = mysql.createConnection(DB_CONFIG);

// SQL Injection vulnerability
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  
  // Direct string concatenation - SQL injection
  const query = `SELECT * FROM users WHERE id = '${userId}' AND active = 1`;
  
  db.query(query, (error, results) => {
    if (error) {
      // Information disclosure
      res.status(500).json({ 
        error: error.message,
        query: query,
        stack: error.stack 
      });
      return;
    }
    res.json(results);
  });
});

// Command Injection vulnerability
app.post('/api/ping', (req, res) => {
  const { host } = req.body;
  
  // Direct command execution
  const { exec } = require('child_process');
  exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
    res.json({
      output: stdout,
      error: stderr
    });
  });
});

// Server-Side Request Forgery (SSRF)
app.post('/api/fetch-url', async (req, res) => {
  const { url } = req.body;
  const axios = require('axios');
  
  try {
    // No URL validation - SSRF vulnerability
    const response = await axios.get(url);
    res.json({ content: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('VulnApp API running on port 3000');
});

module.exports = app;
