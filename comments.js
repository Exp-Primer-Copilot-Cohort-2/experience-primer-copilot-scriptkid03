// Create web server
// Create a list of comments
// Add a new comment
// Delete a comment
// Update a comment
// Get all comments
// Get a comment by id
// Get comments by user
// Get comments by post

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments.json');
const fs = require('fs');

app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  res.json(comment);
});

// Get comments by user
app.get('/comments/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userComments = comments.filter((comment) => comment.userId === userId);
  res.json(userComments);
});

// Get comments by post
app.get('/comments/post/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const postComments = comments.filter((comment) => comment.postId === postId);
  res.json(postComments);
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  comments.splice(index, 1);
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json({ success: true });
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newComment = req.body;
  const index = comments.findIndex((comment) => comment.id === id);
  comments[index] = newComment;
  fs.writeFileSync('./comments.json', JSON.stringify(comments));
  res.json(newComment);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});