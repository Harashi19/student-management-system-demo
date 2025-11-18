# Quick Start: Deploy to GitHub Pages

## 🚀 Fast Track (5 minutes)

### Step 1: Update Repository Name
Edit `frontend/vite.config.ts` line 8:
```typescript
base: process.env.GITHUB_PAGES === 'true' ? '/YOUR-REPO-NAME/' : '/',
```
Replace `YOUR-REPO-NAME` with your actual GitHub repository name.

### Step 2: Initialize Git (if needed)
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 3: Create GitHub Repo & Push
```bash
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages (left sidebar)
3. Source: Select **GitHub Actions**

### Step 5: Deploy
Push to main branch - deployment happens automatically!

Or deploy manually:
```bash
cd frontend
npm run deploy
```

## 🌐 Your Site URL
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 🔑 Demo Login
- Admin: admin@school.com / admin123
- Teacher: teacher@school.com / teacher123  
- Student: student@school.com / student123

## 📝 Update Deployment
```bash
git add .
git commit -m "Update"
git push
```

That's it! ✨

For detailed instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md)
