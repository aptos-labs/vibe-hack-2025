# 🚀 Quick API Setup - Your Rate Limiting Fix

## Step 1: Create Environment File

Create a file called `.env.local` in your project root with this content:

```bash
# .env.local
NEXT_PUBLIC_APTOS_API_KEY=bot_Fjqz3tetAbG_LxYkkroHaernmznoK1gfEa8sbMcJgsCJ8
```

## Step 2: Restart Development Server

```bash
npm run dev
```

## ✅ Done! 

Your voting app will now use the API key and avoid rate limiting errors.

## 🚀 For Production (Vercel/Deployment)

Add this environment variable to your hosting platform:

**Variable:** `NEXT_PUBLIC_APTOS_API_KEY`  
**Value:** `bot_Fjqz3tetAbG_LxYkkroHaernmznoK1gfEa8sbMcJgsCJ8`

That's it! No more 429 rate limit errors! 🎉