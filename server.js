


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Read JSON data sent to the server
app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


// GET route
app.get("/", (req, res) => {
  res.send("My Week 2 API!");
});

// POST route
app.post("/user", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  res.json({
    message: `Hello, ${name}!`
  });
});

// GET user profile
app.get("/user/:id", (req, res) => {
  const id = req.params.id;

  res.send(`User ${id} profile`);
});

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err.status === 400) {
    return res.status(400).json({
      error: "Invalid JSON data"
    });
  }

  res.status(500).json({
    error: "Something went wrong"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});