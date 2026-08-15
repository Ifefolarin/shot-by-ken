import type { NextConfig } from "next";

// Next.js App Router injects inline scripts for RSC hydration — 'unsafe-inline'
// is required. Nonce-based CSP would force dynamic rendering (no CDN cache) which
// is wrong for a static marketing site. All other source types remain locked to 'self'.
const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // 'unsafe-eval' only in dev: React uses eval for enhanced error stack reconstruction
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "connect-src 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options",          value: "DENY" },
  { key: "X-Content-Type-Options",   value: "nosniff" },
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security",value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy",  value: csp },
];

const nextConfig: NextConfig = {
  headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats:   ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
