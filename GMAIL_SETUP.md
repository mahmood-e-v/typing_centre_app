# How to Connect Gmail to Your App

To send emails (like password resets) using your Gmail account, you cannot use your regular password. You must use a **Google App Password**.

## Step 1: Generate an App Password
1.  Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2.  Enable **2-Step Verification** if it's not already on.
3.  Search for **"App passwords"** in the search bar at the top (or look under "2-Step Verification").
4.  Create a new app password:
    *   **App name**: `Typing Centre App` (or anything you like)
    *   Click **Create**.
5.  Copy the 16-character code (it looks like `abcd efgh ijkl mnop`). This is your `SMTP_PASS`.

## Step 2: Configure Environment Variables

### For Local Development (`.env`)
Add or update these lines in your `.env` file:

```properties
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM="Service Center Pro <your-email@gmail.com>"
```

### For Vercel Production
1.  Go to your Vercel Project Settings → **Environment Variables**.
2.  Add the same variables as above:
    *   `SMTP_HOST`: `smtp.gmail.com`
    *   `SMTP_PORT`: `587`
    *   `SMTP_SECURE`: `false`
    *   `SMTP_USER`: (Your Gmail address)
    *   `SMTP_PASS`: (The App Password you generated)

## Step 3: Test It
I have created a script for you to test if it works. Run:

```bash
# Windows PowerShell
$env:SMTP_USER="your-email@gmail.com"; $env:SMTP_PASS="your-app-password"; node scripts/test-email.js

# Or if you have set them in .env already:
node scripts/test-email.js
```
