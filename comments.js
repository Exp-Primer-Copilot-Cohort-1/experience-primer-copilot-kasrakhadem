// create web server with express
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const comments = require('./data/comments');

let counter = comments.length + 1;

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find(comment => comment._id === Number(id));
  res.json(comment);
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment._id = counter;
  comments.push(newComment);
  counter++;
  res.json(newComment);
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const newComment = req.body;
  const comment = comments.find(comment => comment._id === Number(id));
  comment.body = newComment.body;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const commentIndex = comments.findIndex(comment => comment._id === Number(id));
  comments.splice(commentIndex, 1);
  res.json(comments);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));