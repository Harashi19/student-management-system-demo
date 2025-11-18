# GitHub Pages Deployment Checklist ✅

Use this checklist to ensure smooth deployment:

## Pre-Deployment

- [ ] **Update `vite.config.ts`**
  - Replace `/your-repo-name/` with your actual repository name
  - Example: `/school-management-system/`

- [ ] **Test local build**
  ```bash
  cd frontend
  npm run build:gh-pages
  npm run preview
  ```

- [ ] **Verify demo credentials work**
  - Test login with admin, teacher, student accounts
  - Check all dashboards load correctly

## Git Setup

- [ ] **Initialize Git** (if not done)
  ```bash
  git init
  ```

- [ ] **Create .gitignore** (should already exist)
  - Verify `node_modules/` is ignored
  - Verify `dist/` is ignored

- [ ] **Initial commit**
  ```bash
  git add .
  git commit -m "Initial commit: School Management System"
  ```

## GitHub Setup

- [ ] **Create GitHub repository**
  - Go to github.com/new
  - Choose a repository name (remember this!)
  - Keep it public (required for free GitHub Pages)
  - Don't initialize with README

- [ ] **Connect local to GitHub**
  ```bash
  git remote add origin https://github.com/USERNAME/REPO_NAME.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Enable GitHub Pages**
  - Repository Settings → Pages
  - Source: GitHub Actions
  - Save

## Deployment

- [ ] **Automatic deployment**
  - Push triggers automatic deployment
  - Check Actions tab for progress
  - Wait 2-3 minutes for completion

  OR

- [ ] **Manual deployment**
  ```bash
  cd frontend
  npm run deploy
  ```

## Post-Deployment

- [ ] **Access deployed site**
  - URL: `https://USERNAME.github.io/REPO_NAME/`
  - Bookmark for easy access

- [ ] **Test deployed site**
  - [ ] Login page loads
  - [ ] Can login as admin
  - [ ] Can login as teacher
  - [ ] Can login as student
  - [ ] All dashboards display correctly
  - [ ] Navigation works
  - [ ] No console errors

- [ ] **Update README**
  - Add live demo link
  - Add demo credentials
  - Add screenshots (optional)

## Troubleshooting

If something goes wrong:

- [ ] **Check Actions tab** for build errors
- [ ] **Verify base path** in vite.config.ts matches repo name
- [ ] **Clear browser cache** and try again
- [ ] **Check GitHub Pages settings** are correct
- [ ] **Review deployment logs** in Actions tab

## Optional Enhancements

- [ ] Add custom domain (requires domain ownership)
- [ ] Add repository description and topics
- [ ] Add social preview image
- [ ] Create release tags for versions
- [ ] Set up branch protection rules

## Quick Commands Reference

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy manually
npm run deploy

# Preview build locally
npm run preview

# Update deployment
git add .
git commit -m "Update message"
git push
```

## Success Criteria ✨

Your deployment is successful when:
- ✅ Site loads at `https://USERNAME.github.io/REPO_NAME/`
- ✅ No 404 errors
- ✅ All assets load correctly
- ✅ Login works with demo credentials
- ✅ All dashboards are accessible
- ✅ No console errors

---

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
