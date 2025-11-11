# Quick Setup Instructions

## Step-by-Step Guide to Run the Todo App

### Prerequisites Check
1. ✅ Node.js installed (check: `node --version`)
2. ✅ MongoDB installed and running (check: `mongod --version`)
3. ✅ npm installed (check: `npm --version`)

---

## Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# Start MongoDB (if not already running)
# Windows: Run MongoDB as a service or use:
# mongod

# Start the backend server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
Connected to MongoDB
```

---

## Frontend Setup (Terminal 2)

Open a **NEW terminal window** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# Start the frontend development server
npm run dev
```

**Expected Output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

---

## Access the Application

1. Open your browser
2. Go to: `http://localhost:3000`
3. You should see the Login page
4. Click "Create a new account" to register
5. After registration, you'll be redirected to the dashboard

---

## Testing the App

### 1. Register a New User
- Username: testuser
- Email: test@example.com
- Password: password123

### 2. Add Your First Todo
- Title: "Complete project"
- Description: "Finish the MERN todo app"
- Priority: High
- Category: Work
- Due Date: (select a date)

### 3. Test Features
- ✅ Mark todo as complete
- ✅ Edit the todo
- ✅ Delete the todo
- ✅ Filter by status/priority/category
- ✅ Search todos
- ✅ Toggle dark/light mode
- ✅ Logout and login again

---

## Common Issues & Solutions

### Issue 1: MongoDB Not Running
**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
```bash
# Windows: Start MongoDB service
net start MongoDB

# Or run mongod manually
mongod
```

### Issue 2: Port Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update `frontend/src/services/axiosConfig.js` baseURL accordingly

### Issue 3: Dependencies Not Installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 4: CORS Errors
**Solution:**
- Ensure backend is running on port 5000
- Check `frontend/src/services/axiosConfig.js` has correct baseURL
- Restart both servers

---

## Quick Commands Reference

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key_change_this
PORT=5000
NODE_ENV=development
```

**⚠️ Important:** Change `JWT_SECRET` to a secure random string before deploying!

---

## Stopping the Application

1. Press `Ctrl + C` in both terminal windows
2. Type `Y` if prompted to terminate batch job

---

## Next Steps

- Customize the app with your own features
- Deploy to production (Heroku, Vercel, etc.)
- Add more todo categories
- Implement todo sharing between users
- Add email notifications for due dates

---

## Need Help?

Check the main README.md for more detailed information about:
- Project structure
- API endpoints
- Technology stack
- Features list
