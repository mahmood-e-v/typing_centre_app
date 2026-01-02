# How to Deploy to Vercel

Since you have pushed your code to GitHub, deploying to Vercel is very easy.

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in (continue with GitHub).
2.  **Add New Project**:
    *   Click the **"Add New..."** button.
    *   Select **"Project"**.
3.  **Import Git Repository**:
    *   You should see your repository `typing_centre_app` in the list.
    *   Click **"Import"**.
4.  **Configure Project**:
    *   **Framework Preset**: Select `Next.js` (it usually detects this automatically).
    *   **Root Directory**: Leave as `./`.
    *   **Build & Output Settings**: Default (`next build`).
    *   **Environment Variables**:
        *   Expand the **"Environment Variables"** section.
        *   You need to copy the variables from your local `.env` file here.
        *   **IMPORTANT**: Vercel Postgres / Storage might be different if you are moving from a local DB.
        *   If you are using **Supabase** or **Neon**, copy your `DATABASE_URL` and `DIRECT_URL`.
        *   Add `NEXTAUTH_SECRET` (you can generate a new one with `openssl rand -base64 32` or use your existing one).
        *   Add `NEXTAUTH_URL` (Set this to your Vercel domain once deployed, e.g., `https://your-app.vercel.app`, or leave empty for Vercel to handle previews).
5.  **Deploy**:
    *   Click **"Deploy"**.

## Post-Deployment

*   **Database**: Ensure your database (Supabase/Neon) accepts connections from Vercel (allow access from anywhere `0.0.0.0/0` or use Vercel Integration).
*   **Migrations**: If you are setting up a fresh DB, you might need to run migrations. You can do this by connecting your local machine to the production DB string temporarily and running `npx prisma migrate deploy`.
