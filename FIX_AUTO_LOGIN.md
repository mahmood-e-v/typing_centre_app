# How to Fix Auto-Login Issue

## The Problem

Your browser automatically logs you in with your default email without asking for credentials. This happens because:

1. **Saved session cookie** - You have an active session from a previous login
2. **Browser auto-fill** - Your browser saved your password and auto-fills it
3. **Middleware redirect** - If you have a valid session, you're automatically redirected to dashboard

## Solution 1: Clear Your Session (Recommended)

### Option A: Logout Properly
1. If you can access the dashboard, hover over your avatar (top right)
2. Click **"Logout"**
3. This will clear your session properly

### Option B: Clear Browser Cookies
1. **Chrome/Edge:**
   - Press `Ctrl+Shift+Delete`
   - Select "Cookies and other site data"
   - Choose "All time"
   - Click "Clear data"

2. **Firefox:**
   - Press `Ctrl+Shift+Delete`
   - Select "Cookies"
   - Choose "Everything"
   - Click "Clear Now"

### Option C: Use Incognito/Private Mode
1. Open a new **Incognito/Private window** (Ctrl+Shift+N)
2. Navigate to `localhost:3000/login`
3. You'll need to enter credentials every time

## Solution 2: Clear Saved Passwords

### Chrome/Edge:
1. Go to `chrome://settings/passwords`
2. Search for `localhost:3000`
3. Click the three dots → **Remove**

### Firefox:
1. Go to Settings → Privacy & Security → Logins and Passwords
2. Find `localhost:3000`
3. Click **Remove**

## Solution 3: Force Logout via API

Open browser console (F12) and run:

\`\`\`javascript
fetch('/api/logout', { method: 'POST' })
  .then(() => window.location.href = '/login');
\`\`\`

This will clear your session and redirect to login.

## Solution 4: Clear Session Cookie Manually

1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **Cookies** → `http://localhost:3000`
4. Find and delete the **"session"** cookie
5. Refresh the page

## Why Other Emails Work Fine

When you use another email:
- No saved password exists
- No active session cookie
- Browser asks for credentials properly

## Permanent Fix

To prevent auto-login in the future:

1. **Always logout properly** using the logout button
2. **Don't save passwords** for localhost in your browser
3. **Use Incognito mode** for testing different accounts
4. **Clear cookies** between testing sessions

## Quick Test

To verify you're logged out:
1. Go to `localhost:3000/dashboard`
2. If you see the login page → You're logged out ✅
3. If you see the dashboard → You're still logged in ❌

---

**TL;DR:** Clear your browser cookies or use the logout button to properly end your session.
