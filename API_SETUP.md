# 🔑 Aptos API Setup - Fix Rate Limiting

## Problem
Getting this error when voting?
```
✗ Request to [Fullnode]: GET https://fullnode.testnet.aptoslabs.com/v1/transactions/by_hash/... failed with status: (code:429) 
Per anonymous IP per origin rate limit exceeded. Limit: 30000 compute units per 300 seconds window.
```

## Solution: Add API Keys

### Step 1: Get Your API Key
1. **Visit:** https://build.aptoslabs.com/docs/start
2. **Sign up/Login** to get your free API keys
3. **Copy your API key** from the dashboard

### Step 2: Set Environment Variable

Create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_APTOS_API_KEY=your_actual_api_key_here
```

**Replace `your_actual_api_key_here` with your real API key!**

### Step 3: Restart Your Development Server

```bash
npm run dev
```

## ✅ That's it!

Your app will now use API keys and avoid rate limiting. The voting should work smoothly!

## 🔒 Security Note

- The `NEXT_PUBLIC_` prefix makes this available to the frontend
- API keys for reading public data are safe to expose in frontend
- Never put private keys in `NEXT_PUBLIC_` variables!

## 🚀 For Production (Vercel)

Add the environment variable in your Vercel dashboard:
1. Go to your project settings
2. Environment Variables tab  
3. Add: `NEXT_PUBLIC_APTOS_API_KEY` = `your_api_key`
4. Redeploy

Your hackathon voting app will now handle high traffic! 🎉