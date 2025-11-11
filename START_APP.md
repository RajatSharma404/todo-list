# 🚀 START THE TODO APP

## Quick Start (Copy & Paste These Commands)

### Step 1: Install Backend Dependencies
Open a terminal and run:
```bash
cd "d:\Todo List\backend"
npm install
```

### Step 2: Install Frontend Dependencies
Open a NEW terminal and run:
```bash
cd "d:\Todo List\frontend"
npm install
```

### Step 3: Start MongoDB
Make sure MongoDB is running. If not, start it:
```bash
# Windows - Run as Administrator
net start MongoDB

# OR if MongoDB is not installed as a service:
mongod
```

### Step 4: Start Backend Server
In the first terminal (backend):
```bash
npm run dev
```
✅ Wait for: "Server running on port 5000" and "Connected to MongoDB"

### Step 5: Start Frontend Server
In the second terminal (frontend):
```bash
npm run dev
```
✅ Wait for: "Local: http://localhost:3000/"

### Step 6: Open Browser
Navigate to: **http://localhost:3000**

---

## ✨ You're All Set!

The app should now be running. You can:
1. Register a new account
2. Login
3. Start creating todos!

---

## 🛑 To Stop the App
Press `Ctrl + C` in both terminal windows

---

## ❌ Troubleshooting

### MongoDB Not Installed?
Download from: https://www.mongodb.com/try/download/community

### Port 5000 Already in Use?
Kill the process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Need to Reset Everything?
```bash
# Delete node_modules in both folders
cd backend
rmdir /s node_modules
cd ../frontend
rmdir /s node_modules

# Reinstall
cd ../backend
npm install
cd ../frontend
npm install
```
