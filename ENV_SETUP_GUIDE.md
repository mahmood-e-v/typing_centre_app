# How to Get Your Environment Variables

To deploy your app, you need two main things: a Database and a Secret key.

## 1. Get a Database (DATABASE_URL)
You need a PostgreSQL database that can be accessed from the internet (Vercel). The easiest free options are **Neon** or **Supabase**.

### Option A: Neon.tech (Recommended for Vercel)
1.  Go to [neon.tech](https://neon.tech) and Sign Up.
2.  Create a **New Project**.
3.  It will show you a **Connection String** immediately.
    *   It looks like: `postgres://user:password@ep-cool-site.us-east-2.aws.neon.tech/neondb?sslmode=require`
4.  **Copy this string**. This is your `DATABASE_URL`.

### Option B: Supabase
1.  Go to [supabase.com](https://supabase.com) and Sign Up.
2.  Create a **New Project**. Enter a database password (save this, you won't see it again!).
3.  Go to **Project Settings** > **Database**.
4.  Under **Connection String** > **URI**, copy the string.
    *   Replace `[YOUR-PASSWORD]` with the password you just created.
    *   This is your `DATABASE_URL`.
    *   *Note: For Vercel, use the "Transaction Pooler" connection string (port 6543) if available, or adding `?pgbouncer=true` if using the direct connection.*

---

## 2. Generate a Secret (NEXTAUTH_SECRET)
This variable is used to encrypt user sessions. It can be any random long string.

### How to Generate:
*   **Method 1 (Command Line)**:
    Open your terminal and run:
    ```sh
    openssl rand -base64 32
    ```
    Copy the output (e.g., `Jd83kd9...`).

*   **Method 2 (Online)**:
    Go to [generate-secret.vercel.app](https://generate-secret.vercel.app/32).
    Copy the generated string.

*   **Method 3 (Manual)**:
    Just type a very long, random string of characters, numbers, and symbols.

---

## 3. Add to Vercel
1.  Go to your Project in Vercel > **Settings** > **Environment Variables**.
2.  Add `DATABASE_URL` with the value from Step 1.
3.  Add `NEXTAUTH_SECRET` with the value from Step 2.
4.  Add `NEXTAUTH_URL` set to your domain (e.g., `https://my-app.vercel.app`).
