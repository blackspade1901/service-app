# Local Service Provider Platform (Next.js 14 Migration)

## Prerequisites
- Node.js 18+
- Supabase Project
- Razorpay API Keys

## Environment Variables (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key # Server Only
ENCRYPTION_KEY=32_byte_hex_key           # Server Only
RAZORPAY_WEBHOOK_SECRET=your_secret      # Server Only
```

## Setup Instructions
1. `npm install @supabase/ssr @supabase/supabase-js lucide-react leaflet react-leaflet crypto-js`
2. `npx supabase gen types typescript --project-id your_id > src/types/database.ts`
3. `npm run dev`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
