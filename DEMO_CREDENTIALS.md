# Demo Login Credentials

## Quick Start

1. Run: `npm run dev`
2. Open: `http://localhost:5173/login`
3. Click: **"Show Demo Credentials"**
4. Click any account to login instantly!

## Demo Accounts

### 👨‍💼 Administrator
- **Email:** admin@school.com
- **Password:** admin123
- **Access:** Full system access - all modules and features

### 👨‍🏫 Teacher
- **Email:** teacher@school.com
- **Password:** teacher123
- **Access:** Students (view), Academics (marks entry), Attendance (marking)

### 👨‍🎓 Student
- **Email:** student@school.com
- **Password:** student123
- **Access:** View own records, timetable, announcements

### 👨‍👩‍👧 Parent
- **Email:** parent@school.com
- **Password:** parent123
- **Access:** View children's records, fees, communicate with teachers

## Features by Role

### Admin Can Access:
- ✅ Dashboard with full statistics
- ✅ Student Management (add, edit, transfer)
- ✅ Teacher Management (add, edit, assign)
- ✅ Academic Records (marks, assessments, analytics)
- ✅ Attendance Management
- ✅ Timetable (view and generate)
- ✅ Finance Module
- ✅ Hostel Management
- ✅ Communication (announcements, messages)

### Teacher Can Access:
- ✅ Dashboard with class statistics
- ✅ Student List (view only)
- ✅ Marks Entry
- ✅ Attendance Marking
- ✅ Timetable (view)
- ✅ Communication

### Student Can Access:
- ✅ Dashboard with personal info
- ✅ Academic Records (view own)
- ✅ Attendance (view own)
- ✅ Timetable (view own)
- ✅ Announcements
- ✅ Calendar

### Parent Can Access:
- ✅ Dashboard with children's overview
- ✅ Children's Academic Records
- ✅ Children's Attendance
- ✅ Fee Information
- ✅ Messages with Teachers
- ✅ Announcements

## Testing Different Roles

1. **Login as Admin** to see full system capabilities
2. **Logout** (click user menu → Logout)
3. **Login as Teacher** to see limited access
4. **Try accessing** `/students/new` - you'll see "Access Denied"
5. **Login as Student** to see student perspective
6. **Notice** how the sidebar menu changes based on role

## Demo Mode Features

- ✅ **No Backend Required** - Works completely offline
- ✅ **Instant Login** - Click to login, no waiting
- ✅ **Persistent Session** - Stays logged in until you logout
- ✅ **Role-Based Access** - Proper permission checking
- ✅ **Real UI/UX** - Identical to production experience

## Notes

- Demo mode uses localStorage to persist login state
- All demo accounts have the same password pattern: `{role}123`
- Demo data is client-side only (no real API calls)
- Perfect for UI/UX testing and demonstrations
- Switch between accounts to test different permission levels

## Troubleshooting

**Can't see demo credentials?**
- Click "Show Demo Credentials" button on login page

**Login not working?**
- Make sure you're using exact credentials (case-sensitive)
- Or just click the demo account buttons

**Want to logout?**
- Click your name in top-right corner
- Select "Logout" from dropdown menu

**Want to test with real backend?**
- Set `VITE_API_URL` in `.env` file
- Use real credentials from your database
- Demo credentials will still work as fallback
