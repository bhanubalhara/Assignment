# Deployment Guide

## Vercel Deployment

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Form Builder Assignment"
```

2. Create a new repository on GitHub

3. Push to GitHub:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"
7. Your app will be live in minutes!

#### Option B: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to complete deployment

### Step 3: Get Your Deployment URL

After deployment, Vercel will provide you with:
- Production URL: `https://your-project-name.vercel.app`
- Preview URLs for each branch/PR

## Environment Variables

This project doesn't require any environment variables for basic functionality.

## Build Settings

Vercel will automatically detect:
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

These settings are already configured in `vercel.json`.

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails

- Check Node.js version (should be 18+)
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Runtime Errors

- Check browser console for errors
- Verify all imports are correct
- Ensure TypeScript compilation succeeds

## Performance

Vercel automatically optimizes:
- Image optimization
- Code splitting
- Static generation
- Edge caching

## Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Every push to other branches → Preview
- Every Pull Request → Preview with unique URL

