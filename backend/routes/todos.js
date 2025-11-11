const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

// Get all todos for user
router.get('/', async (req, res) => {
  try {
    const { status, priority, category, search } = req.query;
    
    // Build filter
    let filter = { userId: req.userId };
    
    if (status === 'active') {
      filter.completed = false;
    } else if (status === 'completed') {
      filter.completed = true;
    }
    
    if (priority) {
      filter.priority = priority;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const todos = await Todo.find(filter)
      .sort({ createdAt: -1 })
      .exec();

    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error fetching todos' });
  }
});

// Create new todo
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (title.length > 100) {
      return res.status(400).json({ message: 'Title must be less than 100 characters' });
    }

    if (description && description.length > 500) {
      return res.status(400).json({ message: 'Description must be less than 500 characters' });
    }

    const todo = new Todo({
      userId: req.userId,
      title: title.trim(),
      description: description?.trim(),
      priority: priority || 'medium',
      category,
      dueDate: dueDate ? new Date(dueDate) : null
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error creating todo' });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, category, dueDate, completed } = req.body;
    
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Validation
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: 'Title cannot be empty' });
      }
      if (title.length > 100) {
        return res.status(400).json({ message: 'Title must be less than 100 characters' });
      }
      todo.title = title.trim();
    }

    if (description !== undefined) {
      if (description && description.length > 500) {
        return res.status(400).json({ message: 'Description must be less than 500 characters' });
      }
      todo.description = description?.trim();
    }

    if (priority !== undefined) {
      todo.priority = priority;
    }

    if (category !== undefined) {
      todo.category = category;
    }

    if (dueDate !== undefined) {
      todo.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (completed !== undefined) {
      todo.completed = completed;
    }

    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error updating todo' });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error deleting todo' });
  }
});

// Toggle completion status
router.put('/:id/toggle', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();
    
    res.json(todo);
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ message: 'Server error toggling todo' });
  }
});

module.exports = router;
