const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const dbPath = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions to read/write JSON database
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], todos: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '7d' });
};

// Auth middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

// ============ AUTH ROUTES ============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const db = readDB();

    // Check if user exists
    const existingUser = db.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    writeDB(db);

    // Generate token
    const token = generateToken(newUser.id);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const db = readDB();

    // Find user
    const user = db.users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ============ TODO ROUTES ============

// Get all todos for user
app.get('/api/todos', auth, (req, res) => {
  try {
    const { status, priority, category, search } = req.query;
    const db = readDB();
    
    let todos = db.todos.filter(t => t.userId === req.userId);
    
    // Apply filters
    if (status === 'active') {
      todos = todos.filter(t => !t.completed);
    } else if (status === 'completed') {
      todos = todos.filter(t => t.completed);
    }
    
    if (priority) {
      todos = todos.filter(t => t.priority === priority);
    }
    
    if (category) {
      todos = todos.filter(t => t.category === category);
    }
    
    if (search) {
      todos = todos.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort by createdAt descending
    todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error fetching todos' });
  }
});

// Create new todo
app.post('/api/todos', auth, (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (title.length > 100) {
      return res.status(400).json({ message: 'Title must be less than 100 characters' });
    }

    const db = readDB();

    const newTodo = {
      _id: Date.now().toString(),
      userId: req.userId,
      title: title.trim(),
      description: description?.trim() || '',
      completed: false,
      priority: priority || 'medium',
      category: category || null,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.todos.push(newTodo);
    writeDB(db);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error creating todo' });
  }
});

// Update todo
app.put('/api/todos/:id', auth, (req, res) => {
  try {
    const { title, description, priority, category, dueDate, completed } = req.body;
    const db = readDB();
    
    const todoIndex = db.todos.findIndex(t => t._id === req.params.id && t.userId === req.userId);
    
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const todo = db.todos[todoIndex];

    // Update fields
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      todo.title = title.trim();
    }

    if (description !== undefined) {
      todo.description = description?.trim() || '';
    }

    if (priority !== undefined) {
      todo.priority = priority;
    }

    if (category !== undefined) {
      todo.category = category;
    }

    if (dueDate !== undefined) {
      todo.dueDate = dueDate;
    }

    if (completed !== undefined) {
      todo.completed = completed;
    }

    todo.updatedAt = new Date().toISOString();
    db.todos[todoIndex] = todo;
    writeDB(db);

    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error updating todo' });
  }
});

// Delete todo
app.delete('/api/todos/:id', auth, (req, res) => {
  try {
    const db = readDB();
    const todoIndex = db.todos.findIndex(t => t._id === req.params.id && t.userId === req.userId);
    
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    db.todos.splice(todoIndex, 1);
    writeDB(db);

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error deleting todo' });
  }
});

// Toggle completion status
app.put('/api/todos/:id/toggle', auth, (req, res) => {
  try {
    const db = readDB();
    const todoIndex = db.todos.findIndex(t => t._id === req.params.id && t.userId === req.userId);
    
    if (todoIndex === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    db.todos[todoIndex].completed = !db.todos[todoIndex].completed;
    db.todos[todoIndex].updatedAt = new Date().toISOString();
    
    writeDB(db);
    
    res.json(db.todos[todoIndex]);
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ message: 'Server error toggling todo' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Using JSON file database (no MongoDB needed!)`);
});
