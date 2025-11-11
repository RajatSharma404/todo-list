# 🗄️ MongoDB Installation Guide for Windows

## Quick Install (Recommended)

### Option 1: MongoDB Community Server (Full Install)

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Version: Latest (7.0+)
   - Package: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - ✅ **IMPORTANT:** Check "Install MongoDB as a Service"
   - ✅ **IMPORTANT:** Check "Install MongoDB Compass" (GUI tool)
   - Click "Next" and "Install"

3. **Verify Installation**
   ```bash
   mongod --version
   ```

4. **Start MongoDB Service**
   ```bash
   net start MongoDB
   ```

---

## Option 2: Quick Setup with MongoDB Atlas (Cloud - No Installation)

If you don't want to install MongoDB locally, use the free cloud version:

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a region close to you
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `todoapp`
   - Password: `todoapp123` (or your choice)
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://todoapp:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update Backend .env File**
   ```env
   MONGO_URI=mongodb+srv://todoapp:todoapp123@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_change_this
   PORT=5000
   NODE_ENV=development
   ```
   Replace `<password>` with your actual password and update the cluster URL.

---

## Option 3: Using Docker (Advanced)

If you have Docker installed:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## After Installation - Test Connection

1. **Restart Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Look for Success Message**
   ```
   Server running on port 5000
   Connected to MongoDB ✅
   ```

---

## Troubleshooting

### MongoDB Service Won't Start
```bash
# Run as Administrator
net start MongoDB
```

### Port 27017 Already in Use
```bash
# Find process using port
netstat -ano | findstr :27017

# Kill the process
taskkill /PID <PID_NUMBER> /F
```

### Connection Refused Error
- Make sure MongoDB service is running
- Check if port 27017 is accessible
- Verify MONGO_URI in .env file

---

## Quick Test

Once MongoDB is running, test your app:

1. Open: http://localhost:3000
2. Click "Create a new account"
3. Register with any credentials
4. If successful, MongoDB is working! 🎉

---

## Recommended: Use MongoDB Atlas (Cloud)

For the easiest setup without installing anything:
- ✅ No installation required
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Works from anywhere
- ✅ No local resource usage

Just follow **Option 2** above!
