/** @type {import('next').NextConfig} */
// Phase 1: standard Next.js build, deployed to Vercel (pages + API routes together).
// Phase 2: Capacitor needs `output: 'export'` for the static shell it wraps —
// switch this on for the mobile build only; API routes stay on Vercel and are
// called remotely from the app, per the plan's Capacitor setup steps.
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
