# School Management System - Frontend

A modern, responsive React application for managing school operations including students, teachers, academics, attendance, finance, and more.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173/login
```

## 🎭 Demo Mode - No Backend Required!

Click **"Show Demo Credentials"** on the login page for instant access:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | admin123 |
| Teacher | teacher@school.com | teacher123 |
| Student | student@school.com | student123 |
| Parent | parent@school.com | parent123 |

**Or just click any demo account button to login instantly!**

📖 See [DEMO_CREDENTIALS.md](./DEMO_CREDENTIALS.md) for detailed information.

## ✨ Features

### Implemented ✅
- **Authentication System**
  - Login with form validation
  - Protected routes
  - Role-based access control
  - Two-factor authentication component
  - Demo mode for testing

- **Application Shell**
  - Responsive layout (desktop, tablet, mobile)
  - Top navigation bar with search, notifications, user menu
  - Collapsible sidebar with role-based menu
  - Theme toggle (light/dark)

- **Admin Dashboard** 
  - Statistics cards with trends
  - Pending approvals table
  - Recent activity feed
  - Quick action buttons
  - Performance overview metrics
  - Fully interactive data tables

### Coming Soon 🚧
- Student Management
- Teacher Management
- Academic Records & Marks Entry
- Attendance Management
- Timetable Generation
- Finance & Fee Management
- Hostel Management
- Communication & Announcements
- Reports & Analytics

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit + RTK Query
- **Routing:** React Router v6
- **UI Framework:** Material-UI v7
- **Forms:** React Hook Form + Zod
- **Icons:** Material-UI Icons

## 📁 Project Structure

```
src/
├── api/                    # RTK Query API definitions
├── components/
│   └── layout/            # Layout components (AppBar, Sidebar)
├── features/
│   └── auth/              # Authentication feature module
├── pages/                 # Page components
├── routes/                # Route guards and configuration
├── store/                 # Redux store setup
├── theme/                 # Material-UI theme
├── types/                 # TypeScript type definitions
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run format          # Format with Prettier
npm run format:check    # Check formatting
npm run type-check      # TypeScript type checking
```

## 🧪 Testing the Application

### 1. Login & Authentication
- Try different demo accounts to see role-based access
- Test form validation with invalid inputs
- Check "Remember me" functionality

### 2. Navigation
- Explore the sidebar menu (changes based on role)
- Test mobile responsive design (resize browser)
- Try the search bar (UI only for now)

### 3. Role-Based Access
- Login as Admin → Full access to all modules
- Login as Teacher → Limited to teaching-related features
- Login as Student → View-only access to personal data
- Try accessing restricted pages → See "Access Denied"

### 4. User Interface
- Toggle theme (light/dark mode button in AppBar)
- Check notifications (click bell icon)
- Open user menu (click profile icon)
- Test logout functionality

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
# API Configuration (optional - demo mode works without backend)
VITE_API_URL=http://localhost:8000/api

# App Configuration
VITE_APP_NAME=School Management System
```

### Connecting to Backend

1. Ensure Django backend is running
2. Set `VITE_API_URL` in `.env`
3. Use real credentials from your database
4. Demo credentials will still work as fallback

## 📚 Documentation

- [Demo Guide](./DEMO_GUIDE.md) - Comprehensive testing guide
- [Demo Credentials](./DEMO_CREDENTIALS.md) - All demo accounts and access levels
- [Tasks](../.kiro/specs/frontend-application/tasks.md) - Implementation progress

## 🎨 Design System

- **Primary Color:** Blue (#1976d2)
- **Secondary Color:** Orange (#ff9800)
- **Font:** Roboto
- **Spacing:** 8px base unit
- **Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1023px
  - Desktop: ≥ 1024px

## 🐛 Troubleshooting

**Port already in use?**
- Vite will automatically use the next available port

**Can't login?**
- Use demo credentials (see above)
- Or click "Show Demo Credentials" button

**Sidebar not showing?**
- Click the menu icon (☰) in the top-left corner

**TypeScript errors?**
- Run `npm run type-check` to see all errors
- Most IDE errors resolve after saving files

## 📝 License

This project is part of the School Management System.

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Follow Material-UI design patterns
4. Write meaningful commit messages
5. Test with different demo accounts

## 📞 Support

For issues or questions:
- Check the [Demo Guide](./DEMO_GUIDE.md)
- Review [Demo Credentials](./DEMO_CREDENTIALS.md)
- Contact your administrator

---

**Ready to explore?** Run `npm run dev` and login with any demo account! 🚀
