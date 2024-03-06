// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Mock user data for authentication
const users = [
    { username: 'user1', password: 'password1', id: 1 },
    { username: 'user2', password: 'password2', id: 2 }
];

// Mock post data
let posts = [
    { id: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, title: 'Post 2', content: 'Content of post 2' }
];

// Login route
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Successful login
        res.json({ message: 'Login successful', user });
    } else {
        // Invalid credentials
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Register route (returns HTML page)
app.get('/auth/register', (req, res) => {
    // You can customize the registration form as needed
    res.send(`
        <html>
            <body>
                <h1>Register Page</h1>
                <form action="/auth/register" method="post">
                    <input type="text" name="username" placeholder="Username">
                    <input type="password" name="password" placeholder="Password">
                    <button type="submit">Register</button>
                </form>
            </body>
        </html>
    `);
});

// Endpoint to retrieve all posts
app.get('/post/all', (req, res) => {
    res.send(posts);
});

// Endpoint to retrieve a post by ID
app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
        res.send(post);
    } else {
        res.status(404).send({ message: 'Post not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
