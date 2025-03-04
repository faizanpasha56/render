const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Mock data for Instagram posts
const posts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/500/500?random=${i + 1}`,
  caption: `Post ${i + 1}`,
}));

// Route to serve the initial page
app.get('/', (req, res) => {
  res.render('index', { posts: posts.slice(0, 10) }); // Load first 10 posts
});

// API endpoint to load more posts
app.get('/load-more', (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const nextPosts = posts.slice(offset, offset + limit);
  res.json(nextPosts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
