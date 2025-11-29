# Backend Deployment Guide - Vercel

This guide will walk you through deploying your Express.js backend to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI installed globally
- MongoDB Atlas database (or accessible MongoDB instance)
- All environment variables ready

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account.

## Step 3: Deploy to Vercel

Navigate to your backend directory:

```bash
cd backend
```

Run the deployment command:

```bash
vercel
```

The CLI will ask you several questions:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time) or Yes (if redeploying)
- **Project name?** → Accept default or provide a custom name
- **Directory?** → Press Enter (current directory)
- **Override settings?** → No

This creates a **preview deployment**. The CLI will output a URL like `https://your-project-xyz.vercel.app`

## Step 4: Configure Environment Variables

Go to your Vercel dashboard:
1. Navigate to your project
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key-here` |
| `PORT` | Server port (optional, Vercel handles this) | `3000` |
| `FRONTEND_URL` | Your production frontend URL | `https://your-frontend.vercel.app` |

> **Important**: Add these variables for **Production**, **Preview**, and **Development** environments as needed.

## Step 5: Deploy to Production

After configuring environment variables, deploy to production:

```bash
vercel --prod
```

This creates a **production deployment** at your project's main URL.

## Step 6: Verify Deployment

Test your deployed backend:

1. **Root endpoint**: Visit `https://your-project.vercel.app/` - should return "Hello World"
2. **API Documentation**: Visit `https://your-project.vercel.app/api-docs` - should show Swagger UI
3. **Test an endpoint**: Try `https://your-project.vercel.app/api/v1/skill` or another endpoint

## Step 7: Update Frontend Configuration

Update your frontend to use the deployed backend URL:

In your frontend's `src/services/api.js` (or equivalent):

```javascript
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend.vercel.app/api/v1'
  : 'http://localhost:3000/api/v1';
```

Or set it as an environment variable in your frontend's `.env`:

```
VITE_API_URL=https://your-backend.vercel.app/api/v1
```

## Redeployment

To redeploy after making changes:

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

Vercel also supports **automatic deployments** from Git:
1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel dashboard
3. Connect the repository
4. Every push to main branch will auto-deploy to production

## Troubleshooting

### Issue: "Cannot find module"
- **Solution**: Ensure all dependencies are in `package.json`, not just `devDependencies`

### Issue: Database connection fails
- **Solution**: Check that `MONGODB_URI` is correctly set in Vercel environment variables
- Ensure your MongoDB Atlas allows connections from all IPs (0.0.0.0/0) or Vercel's IP ranges

### Issue: CORS errors
- **Solution**: Add your frontend URL to the `FRONTEND_URL` environment variable in Vercel
- Redeploy after adding the variable

### Issue: 404 on API routes
- **Solution**: Verify `vercel.json` routes configuration is correct
- Check that `server.js` is properly exporting the Express app

## Monitoring

- **Logs**: View real-time logs in Vercel dashboard under **Deployments** → Select deployment → **Logs**
- **Analytics**: Enable Vercel Analytics in project settings
- **Errors**: Check the **Functions** tab for serverless function errors

## Environment-Specific Configuration

Your backend now supports dynamic CORS configuration:
- Development: Accepts `localhost:5173`, `localhost:5174`, `localhost:5175`
- Production: Accepts URL from `FRONTEND_URL` environment variable

This allows the same codebase to work in both environments without code changes.

## Next Steps

1. ✅ Deploy backend to Vercel
2. ✅ Configure environment variables
3. ✅ Test all endpoints
4. 🔲 Deploy frontend to Vercel (if not done already)
5. 🔲 Update frontend to use production backend URL
6. 🔲 Test full application flow
7. 🔲 Set up custom domain (optional)
8. 🔲 Enable automatic deployments from Git (recommended)

---

**Need Help?** Check [Vercel Documentation](https://vercel.com/docs) or [Vercel Community](https://github.com/vercel/vercel/discussions)
