// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable parsing JSON bodies
// Create database connection
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'comments'
});
db.connect();
// Create routes
app.get('/', (req, res) => {
  db.query('SELECT * FROM comments', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});
app.post('/', (req, res) => {
  db.query('INSERT INTO comments SET ?', req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3000, () => console.log('Server ready'));