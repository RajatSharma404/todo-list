# MERN Stack Todo Application

A full-stack todo list application built with MongoDB, Express, React, and Node.js.

## Features

- ✅ User authentication (Register/Login) with JWT
- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter by status (all, active, completed)
- ✅ Filter by priority (low, medium, high)
- ✅ Filter by category (work, personal, shopping, health)
- ✅ Search todos by title
- ✅ Dark/Light mode toggle
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Installation & Setup

### 1. Clone or Download the Project

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Make sure MongoDB is running on your system
# Default connection: mongodb://localhost:27017/todo-app

# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Environment Variables

The backend uses the following environment variables (already configured in `.env`):

```
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

**Important:** Change the `JWT_SECRET` to a secure random string in production.

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Add Tasks**: Create new todos with title, description, priority, category, and due date
4. **Manage Tasks**: 
   - Click checkbox to mark as complete/incomplete
   - Click edit icon to modify a task
   - Click delete icon to remove a task
5. **Filter Tasks**: Use the filter bar to search and filter by status, priority, or category
6. **Toggle Theme**: Click the sun/moon icon to switch between light and dark mode

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos (Protected Routes)
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PUT /api/todos/:id/toggle` - Toggle todo completion status

## Project Structure

```
todo-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── todos.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── TodoForm.jsx
    │   │   ├── TodoList.jsx
    │   │   ├── TodoItem.jsx
    │   │   ├── FilterBar.jsx
    │   │   └── ThemeToggle.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── DashboardPage.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── TodoContext.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   ├── todoService.js
    │   │   └── axiosConfig.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is installed and running
- Check if the connection string in `.env` is correct
- Default MongoDB port is 27017

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Change port in `vite.config.js`

### CORS Issues
- Make sure backend is running on port 5000
- Check `axiosConfig.js` baseURL matches backend URL

## License

MIT

## Author

Created as a MERN stack learning project
